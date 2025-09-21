import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import {
	PaymentProvider,
	SubscriptionStatus,
	TransactionStatus
} from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { MailService } from 'src/libs/mail/mail.service'

import { YoomoneyService } from '../providers/yoomoney/yoomoney.service'

@Injectable()
export class SchedulerService {
	private readonly logger = new Logger(SchedulerService.name)

	constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
		private readonly yoomoneyService: YoomoneyService
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_10AM)
	async handleAutoBilling() {
		const users = await this.prismaService.user.findMany({
			where: {
				subscription: {
					endDate: {
						lte: new Date()
					},
					status: SubscriptionStatus.ACTIVE
				},
				isAutoRenewal: true
			},
			include: {
				subscription: {
					include: {
						plan: true
					}
				}
			}
		})

		if (users.length === 0) {
			this.logger.log(
				'Пользователи для авто-продления тарфиных планов не найдены'
			)
			return
		}

		this.logger.log(
			`Поиск пользователей для авто-продления ${users.length} тарифных планов... ⏳`
		)

		for (const user of users) {
			const lastTransaction =
				await this.prismaService.transaction.findFirst({
					where: {
						userId: user.id,
						status: TransactionStatus.SUCCEEDED
					},
					orderBy: {
						createdAt: 'desc'
					}
				})

			if (!lastTransaction) continue

			if (lastTransaction.provider === PaymentProvider.YOOKASSA) {
				const transaction = await this.prismaService.transaction.create(
					{
						data: {
							amount: lastTransaction.amount,
							provider: PaymentProvider.YOOKASSA,
							billingPeriod: lastTransaction.billingPeriod,
							externalId: lastTransaction.externalId,
							user: {
								connect: {
									id: user.id
								}
							},
							subscription: {
								connect: {
									id: user.subscription?.id
								}
							}
						}
					}
				)

				try {
					await this.yoomoneyService.createBySavedCard(
						user.subscription?.plan!,
						user,
						transaction
					)
				} catch (error) {
					await this.prismaService.transaction.update({
						where: {
							id: transaction.id
						},
						data: {
							status: TransactionStatus.FAILED
						}
					})

					this.logger.error(
						`❌ Ошибка при обработке платежа для пользователя ${user.email} с ошибкой - ${error.message}`
					)
				}
			}
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_10AM)
	async expireSubscriptions() {
		const now = new Date()

		const subscriptions =
			await this.prismaService.userSubscription.findMany({
				where: {
					status: SubscriptionStatus.ACTIVE,
					endDate: {
						lte: now
					}
				},
				include: {
					user: {
						include: {
							transactions: {
								where: {
									status: TransactionStatus.SUCCEEDED
								},
								orderBy: {
									createdAt: 'desc'
								},
								take: 1
							}
						}
					},
					plan: true
				}
			})

		const filteredSubscriptions = subscriptions.filter(sub => {
			const lastTransaction = sub.user.transactions[0]

			if (!lastTransaction) return false

			switch (lastTransaction.provider) {
				case PaymentProvider.YOOKASSA:
				case PaymentProvider.STRIPE:
					return sub.user.isAutoRenewal === false

				case PaymentProvider.CRYPTOPAY:
					return true

				default:
					return false
			}
		})

		if (!filteredSubscriptions.length) {
			this.logger.log(
				'Пользователи для просроченных тарифных планов не найдены'
			)

			return
		}

		for (const subscription of subscriptions) {
			const user = subscription.user

			await this.prismaService.userSubscription.update({
				where: {
					id: subscription.id
				},
				data: {
					status: SubscriptionStatus.EXPIRED
				}
			})

			await this.mailService.sendSubscriptionExpiredMail(user)

			this.logger.log(`Тарифный план у пользователя ${user.email} истек`)
		}
	}
}
