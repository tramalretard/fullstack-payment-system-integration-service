import { Module } from '@nestjs/common'

import { CryptopayModule } from '../providers/cryptopay/cryptopay.module'
import { StripeModule } from '../providers/stripe/stripe.module'

import { YoomoneyModule } from './../providers/yoomoney/yoomoney.module'
import { WebhooksController } from './webhooks.controller'
import { WebhooksService } from './webhooks.service'

@Module({
	imports: [YoomoneyModule, StripeModule, CryptopayModule],
	controllers: [WebhooksController],
	providers: [WebhooksService]
})
export class WebhooksModule {}
