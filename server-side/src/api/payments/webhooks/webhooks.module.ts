import { Module } from '@nestjs/common'

import { StripeModule } from '../providers/stripe/stripe.module'

import { WebhooksController } from './webhooks.controller'
import { WebhooksService } from './webhooks.service'

@Module({
	imports: [StripeModule],
	controllers: [WebhooksController],
	providers: [WebhooksService]
})
export class WebhooksModule {}
