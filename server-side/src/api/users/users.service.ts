import { Injectable, NotFoundException } from '@nestjs/common'
import { PaymentProvider, TransactionStatus, User } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'

import { StripeService } from '../payments/providers/stripe/stripe.service'

import { updateAutoRenewalRequest } from './dto'

@Injectable()
export class UsersService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly stripeService: StripeService
	) {}

	async updateAutoRenewal(user: User, dto: updateAutoRenewalRequest) {
		const { isAutoRenewal } = dto

		const subscription =
			await this.prismaService.userSubscription.findUnique({
				where: {
					userId: user.id
				},
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
			})

		if (!subscription)
			throw new NotFoundException(
				`Активный тарифный план у пользователя ${user.email} не найден`
			)

		const lastTransaction = subscription.transactions[0]

		if (!lastTransaction)
			throw new NotFoundException(
				`У пользователя ${user.email} не найдены транзакции`
			)

		if (
			lastTransaction.provider === PaymentProvider.STRIPE &&
			subscription.stripeSubscriptionId
		) {
			await this.stripeService.updateAutoRenewal(
				subscription.stripeSubscriptionId,
				isAutoRenewal
			)
		}

		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				isAutoRenewal
			}
		})

		return { isAutoRenewal }
	}
}
