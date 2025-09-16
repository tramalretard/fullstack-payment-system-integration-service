import { Module } from '@nestjs/common'

import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'
import { CryptopayModule } from './providers/cryptopay/cryptopay.module'
import { StripeModule } from './providers/stripe/stripe.module'
import { YoomoneyModule } from './providers/yoomoney/yoomoney.module'
import { YoomoneyService } from './providers/yoomoney/yoomoney.service'
import { WebhooksModule } from './webhooks/webhooks.module'

@Module({
	controllers: [PaymentsController],
	providers: [PaymentsService, YoomoneyService],
	imports: [WebhooksModule, StripeModule, YoomoneyModule, CryptopayModule]
})
export class PaymentsModule {}
