import { Module } from '@nestjs/common'

import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'
import { YoomoneyService } from './providers/yoomoney/yoomoney.service'

@Module({
	controllers: [PaymentsController],
	providers: [PaymentsService, YoomoneyService]
})
export class PaymentsModule {}
