import { Injectable, NotFoundException } from '@nestjs/common'
import { BillingPeriod, PaymentProvider, type User } from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'

import { InitPaymentRequest } from './dto'
import { CryptopayService } from './providers/cryptopay/cryptopay.service'
import { StripeService } from './providers/stripe/stripe.service'
import { YoomoneyService } from './providers/yoomoney/yoomoney.service'

@Injectable()
export class PaymentsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly yoomoneyService: YoomoneyService,
		private readonly stripeService: StripeService,
		private readonly cryptopayService: CryptopayService
	) {}

	async getHistory(user: User) {
		const payments = await this.prismaService.transaction.findMany({
			where: {
				userId: user.id
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				subscription: {
					include: {
						plan: true
					}
				}
			}
		})

		const formatted = payments.map(payment => ({
			id: payment.id,
			createdAt: payment.createdAt,
			plan: payment.subscription.plan.title,
			amount: payment.amount,
			provider: payment.provider,
			status: payment.status
		}))

		return formatted
	}

	async init(dto: InitPaymentRequest, user: User) {
		const { planId, billingPeriod, provider } = dto

		const plan = await this.prismaService.plan.findUnique({
			where: {
				id: planId
			}
		})

		if (!plan) throw new NotFoundException('Данный план не найден')

		const amount =
			billingPeriod === BillingPeriod.MONTHLY
				? plan.monthlyPrice
				: plan.yearlyPrice

		const transaction = await this.prismaService.transaction.create({
			data: {
				amount: amount,
				provider,
				billingPeriod,
				user: {
					connect: {
						id: user.id
					}
				},
				subscription: {
					connectOrCreate: {
						where: {
							userId: user.id
						},
						create: {
							user: {
								connect: {
									id: user.id
								}
							},
							plan: {
								connect: {
									id: plan.id
								}
							}
						}
					}
				}
			}
		})

		let payment

		switch (provider) {
			case PaymentProvider.YOOKASSA:
				payment = await this.yoomoneyService.create(plan, transaction)
				break
			case PaymentProvider.STRIPE:
				payment = await this.stripeService.create(
					user,
					plan,
					transaction,
					billingPeriod
				)
				break
			case PaymentProvider.CRYPTOPAY:
				payment = await this.cryptopayService.create(plan, transaction)
				break
		}

		await this.prismaService.transaction.update({
			where: {
				id: transaction.id
			},
			data: {
				providerMeta: payment
			}
		})

		return payment
	}
}
