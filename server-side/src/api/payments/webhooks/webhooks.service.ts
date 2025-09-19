import { BadRequestException, Injectable } from '@nestjs/common'

import { PaymentsHandler } from '../payments.handler'
import { CryptopayService } from '../providers/cryptopay/cryptopay.service'
import { StripeService } from '../providers/stripe/stripe.service'
import { YoomoneyService } from '../providers/yoomoney/yoomoney.service'

import { CryptopayWebhooksDto } from './dto'
import { YookassaWebhooksDto } from './dto/yookassa-webhooks.dto'

@Injectable()
export class WebhooksService {
	constructor(
		private readonly paymentsHandler: PaymentsHandler,
		private readonly yoomoneyService: YoomoneyService,
		private readonly stripeService: StripeService,
		private readonly cryptoService: CryptopayService
	) {}

	async handleYookassa(dto: YookassaWebhooksDto, ip: string) {
		this.yoomoneyService.verifyWebhook(ip)

		const result = await this.yoomoneyService.handleWebhook(dto)

		return await this.paymentsHandler.processResult(result)
	}

	async handleStripe(rawBody: Buffer, sig: string) {
		const event = await this.stripeService.parseEvent(rawBody, sig)

		const result = await this.stripeService.handleWebhook(event)

		if (!result) return { ok: true }

		return await this.paymentsHandler.processResult(result)
	}

	async handleCryptopay(rawBody: Buffer, sig: string) {
		this.cryptoService.verifyWebhook(rawBody, sig)

		const body: CryptopayWebhooksDto = JSON.parse(rawBody.toString())

		if (!this.cryptoService.isFreshReq(body))
			throw new BadRequestException('Запрос устарел')

		const result = await this.cryptoService.handleWebhook(body)

		return await this.paymentsHandler.processResult(result)
	}
}
