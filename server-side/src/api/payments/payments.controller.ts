import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { Authorized, Protected } from 'src/common/decorators'

import { PaymentHistoryResponse } from './dto'
import { PaymentsService } from './payments.service'

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@ApiOperation({
		summary: 'Get payment history',
		description: 'Returns a list of the users entire transaction history'
	})
	@ApiOkResponse({
		type: [PaymentHistoryResponse]
	})
	@Protected()
	@Get()
	async getHistory(@Authorized() user: User) {
		return await this.paymentsService.getHistory(user)
	}
}
