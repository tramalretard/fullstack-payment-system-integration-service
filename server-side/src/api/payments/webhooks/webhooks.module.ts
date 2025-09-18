import { Module } from '@nestjs/common'

import { CryptopayModule } from '../providers/cryptopay/cryptopay.module'
import { StripeModule } from '../providers/stripe/stripe.module'

import { WebhooksController } from './webhooks.controller'
import { WebhooksService } from './webhooks.service'

@Module({
	imports: [StripeModule, CryptopayModule],
	controllers: [WebhooksController],
	providers: [WebhooksService]
})
export class WebhooksModule {}
