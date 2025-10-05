import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type Plan, type Transaction, TransactionStatus } from '@prisma/client'
import { createHash, createHmac } from 'crypto'
import { firstValueFrom } from 'rxjs'

import { CRYPTOPAY_API_URL } from '../../constants'
import { PaymentsWebhooksResult } from '../../interfaces'
import { CryptopayWebhooksDto } from '../../webhooks/dto'

import {
	CreateInvoiceRequest,
	CryptoResponse,
	Currency,
	FiatCurrency,
	InvoiceStatus,
	PaidButtonName
} from './interfaces'

@Injectable()
export class CryptopayService {
	private readonly CLIENT_URL: string
	private readonly CRYPTOPAY_TOKEN: string

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {
		this.CLIENT_URL = this.configService.getOrThrow<string>('CLIENT_URL')

		this.CRYPTOPAY_TOKEN =
			this.configService.getOrThrow<string>('CRYPTOPAY_TOKEN')
	}

	async create(plan: Plan, transaction: Transaction) {
		const successUrl = `${this.CLIENT_URL}/payments/${transaction.id}/success`

		const payload: CreateInvoiceRequest = {
			amount: transaction.amount,
			currency_type: Currency.FIAT,
			fiat: FiatCurrency.RUB,
			description: `Оплата тарифного плана "${plan.title}"`,
			hidden_message: 'Тарифный план активирован. Благодарим за оплату!',
			paid_btn_name: PaidButtonName.CALLBACK,
			paid_btn_url: successUrl,
			payload: Buffer.from(
				JSON.stringify({
					transactionId: transaction.id,
					planId: plan.id
				})
			).toString('base64url')
		}

		const response = await this.makeRequest<CreateInvoiceRequest>(
			'POST',
			'/createInvoice',
			payload
		)

		return response.result
	}

	async handleWebhook(
		dto: CryptopayWebhooksDto
	): Promise<PaymentsWebhooksResult> {
		const payload = JSON.parse(
			Buffer.from(dto.payload.payload ?? '', 'base64url').toString(
				'utf-8'
			)
		)

		const transactionId = payload.transactionId
		const planId = payload.planId
		const paymentId = dto.payload.invoice_id.toString()

		let status: TransactionStatus = TransactionStatus.PENDING

		switch (dto.payload.status) {
			case InvoiceStatus.PAID:
				status = TransactionStatus.SUCCEEDED
				break
			case InvoiceStatus.EXPIRED:
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

	verifyWebhook(rawBody: Buffer, sig: string) {
		const secret = createHash('sha256')
			.update(this.CRYPTOPAY_TOKEN)
			.digest()

		const hmac = createHmac('sha256', secret).update(rawBody).digest('hex')

		if (hmac != sig)
			throw new BadRequestException('Подпись токена не валидна')

		return true
	}

	isFreshReq(body: any, maxSeconds: number = 300) {
		const request = new Date(body.request_date).getTime()

		const now = Date.now()

		return now - request <= maxSeconds * 1000
	}

	private async makeRequest<T>(
		method: 'GET' | 'POST',
		endpoint: string,
		data?: any
	) {
		const headers = {
			'Crypto-Pay-API-Token': this.CRYPTOPAY_TOKEN
		}

		const observable = this.httpService.request<CryptoResponse<T>>({
			baseURL: CRYPTOPAY_API_URL,
			url: endpoint,
			method,
			data,
			headers
		})

		const { data: response } = await firstValueFrom(observable)

		return response
	}
}
