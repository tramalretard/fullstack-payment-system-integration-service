import { Injectable } from '@nestjs/common'
import { BillingPeriod, Plan, Transaction } from '@prisma/client'
import {
	ConfirmationEnum,
	CurrencyEnum,
	PaymentMethodsEnum,
	YookassaService
} from 'nestjs-yookassa'

@Injectable()
export class YoomoneyService {
	constructor(private readonly yookassaService: YookassaService) {}

	async create(
		plan: Plan,
		transaction: Transaction,
		billingPeriod: BillingPeriod
	) {
		const amount =
			billingPeriod === BillingPeriod.MONTHLY
				? plan.monthlyPrice
				: plan.yearlyPrice

		const payment = await this.yookassaService.createPayment({
			amount: {
				value: amount,
				currency: CurrencyEnum.RUB
			},
			description: `Оплата тарифного плана "${plan.title}"`,
			payment_method_data: {
				type: PaymentMethodsEnum.bank_card
			},
			confirmation: {
				type: ConfirmationEnum.redirect,
				return_url: 'https://localhost:3000'
			},
			save_payment_method: true
		})

		return payment
	}
}
