import { BadRequestException, Injectable } from '@nestjs/common'
import { type Plan, type Transaction, TransactionStatus } from '@prisma/client'
import CIDR from 'ip-cidr'
import {
	ConfirmationEnum,
	CurrencyEnum,
	PaymentMethodsEnum,
	YookassaService
} from 'nestjs-yookassa'

import type { PaymentsWebhooksResult } from '../../interfaces'
import { YookassaWebhooksDto } from '../../webhooks/dto/yookassa-webhooks.dto'

@Injectable()
export class YoomoneyService {
	private readonly ALLOWED_IPS: string[]

	constructor(private readonly yookassaService: YookassaService) {
		this.ALLOWED_IPS = [
			'185.71.76.0/27',
			'185.71.77.0/27',
			'77.75.153.0/25',
			'77.75.156.11',
			'77.75.156.35',
			'77.75.154.128/25',
			'2a02:5180::/32'
		]
	}

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
			save_payment_method: true,
			metadata: { transactionId: transaction.id, planId: plan.id }
		})

		return payment
	}

	async handleWebhook(
		dto: YookassaWebhooksDto
	): Promise<PaymentsWebhooksResult> {
		const transactionId = dto.object.metadata?.transactionId
		const planId = dto.object.metadata?.planId
		const paymentId = dto.object.id

		let status: TransactionStatus = TransactionStatus.PENDING

		switch (dto.event) {
			case 'payment.waiting_for_capture':
				await this.yookassaService.capturePayment(paymentId)
				break
			case 'payment.succeeded':
				status = TransactionStatus.SUCCEEDED
				break
			case 'payment.canceled':
				status = TransactionStatus.FAILED
				break
		}

		return {
			transactionId,
			planId,
			paymentId,
			status,
			raw: dto
		}
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
