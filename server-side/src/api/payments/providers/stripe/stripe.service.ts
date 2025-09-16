import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	BillingPeriod,
	type Plan,
	type Transaction,
	type User
} from '@prisma/client'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
	private readonly stripe: Stripe

	private readonly STRIPE_WEBHOOK_SECRET: string

	constructor(private readonly configService: ConfigService) {
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

		if (!amount) throw new BadRequestException('ID Stipe плана не найден')

		const successUrl = 'https://localhost:3000'
		const cancelUrl = this.configService.getOrThrow<string>('CLIENT_URL')

		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			customer_email: user.email,
			line_items: [{ price: amount, quantity: 1 }],
			mode: 'subscription',
			success_url: successUrl,
			cancel_url: cancelUrl
		})

		return session
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
				`Ошибка при верификации SECRET_KEY Stripe: ${error}`
			)
		}
	}
}
