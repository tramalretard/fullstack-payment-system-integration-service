import { Injectable } from '@nestjs/common'

import { StripeService } from '../providers/stripe/stripe.service'

@Injectable()
export class WebhooksService {
	constructor(private readonly stripeService: StripeService) {}

	async handleStripe(dto: any, sig: string) {
		const event = await this.stripeService.parseEvent(dto, sig)
	}
}
