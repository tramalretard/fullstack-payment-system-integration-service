import { BadRequestException, Injectable } from '@nestjs/common'

import { CryptopayService } from '../providers/cryptopay/cryptopay.service'
import { StripeService } from '../providers/stripe/stripe.service'

@Injectable()
export class WebhooksService {
	constructor(
		private readonly stripeService: StripeService,
		private readonly cryptoService: CryptopayService
	) {}

	async handleStripe(rawBody: Buffer, sig: string) {
		const event = await this.stripeService.parseEvent(rawBody, sig)
	}

	async handleCryptopay(rawBody: Buffer, sig: string) {
		this.cryptoService.verifyWebhook(rawBody, sig)

		const body = JSON.parse(rawBody.toString())

		if (!this.cryptoService.isFreshReq(body))
			throw new BadRequestException('Запрос устарел')
	}
}
