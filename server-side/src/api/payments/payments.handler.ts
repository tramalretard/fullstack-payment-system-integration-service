import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { SubscriptionStatus, TransactionStatus } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'

import { PaymentsWebhooksResult } from './interfaces'

@Injectable()
export class PaymentsHandler {
	private readonly logger = new Logger(PaymentsHandler.name)

	constructor(private readonly prismaService: PrismaService) {}

	async processResult(result: PaymentsWebhooksResult) {
		const { transactionId, paymentId, planId, status, raw } = result

		const transaction = await this.prismaService.transaction.findUnique({
			where: {
				id: transactionId
			},
			include: {
				subscription: {
					include: {
						user: true,
						plan: true
					}
				}
			}
		})

		if (!transaction) throw new NotFoundException('Транзакция не найдена')

		if (
			transaction.status === TransactionStatus.SUCCEEDED &&
			status !== TransactionStatus.SUCCEEDED
		) {
			this.logger.warn(
				`Attempted to update a SUCCEEDED transaction ${transactionId} to ${status}. Ignoring`
			)
			return { ok: true }
		}

		await this.prismaService.transaction.update({
			where: {
				id: transactionId
			},
			data: {
				status,
				externalId: paymentId,
				providerMeta: raw
			}
		})

		const subscription = transaction.subscription

		if (
			status === TransactionStatus.SUCCEEDED &&
			transaction.subscription
		) {
			const now = new Date()

			const isPlanChanged = subscription.plan.id !== planId

			let baseDate: Date

			if (
				!subscription.endDate ||
				subscription.endDate < now ||
				isPlanChanged
			) {
				baseDate = new Date(now)
			} else {
				baseDate = new Date(subscription.endDate)
			}

			let newEndDate = new Date(baseDate)

			if (transaction.billingPeriod === 'YEARLY') {
				newEndDate.setFullYear(newEndDate.getFullYear() + 1)
			} else {
				const currentDay = newEndDate.getDate()
				newEndDate.setMonth(newEndDate.getMonth() + 1)

				if (newEndDate.getDate() < currentDay) {
					newEndDate.setDate(0)
				}
			}

			await this.prismaService.userSubscription.update({
				where: {
					id: subscription.id
				},
				data: {
					status: 'ACTIVE',
					startDate: now,
					endDate: newEndDate,
					plan: {
						connect: {
							id: planId
						}
					}
				}
			})

			this.logger.log(
				`✅ Тарифный план успешно активирован для пользователя ${subscription.user.email}`
			)
		} else if (status === TransactionStatus.FAILED) {
			await this.prismaService.userSubscription.update({
				where: {
					id: subscription.id
				},
				data: {
					status: SubscriptionStatus.EXPIRED
				}
			})

			this.logger.error(
				`❌ Ошибка при активации тарифного плана для пользователя ${subscription.user.email}`
			)
		}

		return { ok: true }
	}
}
