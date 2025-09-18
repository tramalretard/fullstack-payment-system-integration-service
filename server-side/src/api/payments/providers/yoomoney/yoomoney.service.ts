import { BadRequestException, Injectable } from '@nestjs/common'
import { type Plan, type Transaction } from '@prisma/client'
import CIDR from 'ip-cidr'
import {
	ConfirmationEnum,
	CurrencyEnum,
	PaymentMethodsEnum,
	YookassaService
} from 'nestjs-yookassa'

@Injectable()
export class YoomoneyService {
	private readonly ALLOWED_IPS: string[]

	constructor(private readonly yookassaService: YookassaService) {}

	async create(plan: Plan, transaction: Transaction) {
		const payment = await this.yookassaService.createPayment({
			amount: {
				value: transaction.amount,
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

	verifyWebhook(ip: string) {
		for (const range of this.ALLOWED_IPS) {
			if (range.includes('/')) {
				const cidr = new CIDR(range)

				if (cidr.contains(ip)) return
			} else if (ip === range) return
		}

		throw new BadRequestException(`IP-адрес не валиден: ${ip}`)
	}
}
