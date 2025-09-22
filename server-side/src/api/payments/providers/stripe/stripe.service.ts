import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	BillingPeriod,
	PaymentProvider,
	type Plan,
	type Transaction,
	TransactionStatus,
	type User
} from '@prisma/client'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import Stripe from 'stripe'

import { PaymentsWebhooksResult } from '../../interfaces'

@Injectable()
export class StripeService {
	private readonly stripe: Stripe

	private readonly STRIPE_WEBHOOK_SECRET: string

	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {
		this.stripe = new Stripe(
			this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
			{
				apiVersion: '2025-08-27.basil'
			}
		)

		this.STRIPE_WEBHOOK_SECRET = this.configService.getOrThrow<string>(
			'STRIPE_WEBHOOK_SECRET'
		)
	}

	async create(
		user: User,
		plan: Plan,
		transaction: Transaction,
		billingPeriod: BillingPeriod
	) {
		const amount =
			billingPeriod === BillingPeriod.MONTHLY
				? plan.stripeMonthlyPriceId
				: plan.stripeYearlyPriceId

		if (!amount)
			throw new BadRequestException(
				'Идентификатор тарифного плана в STRIPE не найден'
			)

		const successUrl = 'https://localhost:3000'
		const cancelUrl = this.configService.getOrThrow<string>('CLIENT_URL')

		let customerId = user.stripeCustomerId

		if (!customerId) {
			const customer = await this.stripe.customers.create({
				email: user.email,
				name: user.name
			})

			customerId = customer.id

			await this.prismaService.user.update({
				where: {
					id: user.id
				},
				data: {
					stripeCustomerId: customerId
				}
			})
		}

		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			customer: customerId,
			line_items: [{ price: amount, quantity: 1 }],
			mode: 'subscription',
			success_url: successUrl,
			cancel_url: cancelUrl,
			metadata: {
				transactionId: transaction.id,
				planId: plan.id,
				userId: user.id
			}
		})

		return session
	}

	async handleWebhook(
		event: Stripe.Event
	): Promise<PaymentsWebhooksResult | null> {
		switch (event.type) {
			case 'checkout.session.completed': {
				const session = await this.stripe.checkout.sessions.retrieve(
					event.data.object.id,
					{ expand: ['line_items'] }
				)

				const transactionId = session.metadata?.transactionId
				const planId = session.metadata?.planId
				const userId = session.metadata?.userId
				const paymentId = session.id

				if (!transactionId || !planId) return null

				const stripeSubscriptionId = session.subscription as string

				if (userId && stripeSubscriptionId) {
					await this.prismaService.userSubscription.update({
						where: {
							userId
						},
						data: {
							stripeSubscriptionId
						}
					})
				}

				return {
					transactionId,
					planId,
					paymentId,
					status: TransactionStatus.SUCCEEDED,
					raw: event
				}
			}

			case 'invoice.payment_succeeded': {
				const payment = event.data.object as Stripe.Invoice

				if (payment.billing_reason !== 'subscription_cycle') return null

				return await this.handleAutoBilling(
					payment.customer as string,
					TransactionStatus.SUCCEEDED,
					payment.id ?? '',
					event
				)
			}

			case 'invoice.payment_failed': {
				const payment = event.data.object as Stripe.Invoice

				if (payment.billing_reason === 'subscription_cycle') {
					return await this.handleAutoBilling(
						payment.customer as string,
						TransactionStatus.FAILED,
						payment.id ?? '',
						event
					)
				} else {
					const transactionId = payment.metadata?.transactionId
					const planId = payment.metadata?.planId
					const paymentId = payment.id

					if (!transactionId || !planId || !paymentId) return null

					return {
						transactionId,
						planId,
						paymentId,
						status: TransactionStatus.FAILED,
						raw: event
					}
				}
			}

			default:
				return null
		}
	}

	async updateAutoRenewal(subscriptionId: string, isAutoRenewal: boolean) {
		await this.stripe.subscriptions.update(subscriptionId, {
			cancel_at_period_end: !isAutoRenewal
		})
	}

	async parseEvent(
		rawBody: Buffer,
		signature: string
	): Promise<Stripe.Event> {
		try {
			return await this.stripe.webhooks.constructEventAsync(
				rawBody,
				signature,
				this.STRIPE_WEBHOOK_SECRET
			)
		} catch (error) {
			throw new BadRequestException(
				`Ошибка при верификации секретного ключа Stripe: ${error}`
			)
		}
	}

	private async handleAutoBilling(
		customerId: string,
		status: TransactionStatus,
		externalId: string,
		event: Stripe.Event
	) {
		const user = await this.prismaService.user.findUnique({
			where: {
				stripeCustomerId: customerId
			},
			include: {
				subscription: true,
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

		if (!user || !user.subscription) return null

		const lastTransaction = user.transactions[0]

		if (!lastTransaction || !lastTransaction.subscriptionId) return null

		const subscription =
			await this.prismaService.userSubscription.findUnique({
				where: {
					id: lastTransaction.subscriptionId
				},
				include: {
					plan: true
				}
			})

		if (!subscription) return null

		const transaction = await this.prismaService.transaction.create({
			data: {
				amount: lastTransaction.amount,
				provider: PaymentProvider.STRIPE,
				billingPeriod: lastTransaction.billingPeriod,
				status,
				externalId,
				user: {
					connect: {
						id: user.id
					}
				},
				subscription: {
					connect: {
						id: subscription.id
					}
				}
			}
		})

		return {
			transactionId: transaction.id,
			planId: subscription.plan.id,
			paymentId: externalId,
			status,
			raw: event
		}
	}
}
