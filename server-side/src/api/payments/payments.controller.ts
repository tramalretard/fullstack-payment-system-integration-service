import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { Authorized, Protected } from 'src/common/decorators'

import {
	InitPaymentRequest,
	InitPaymentResponse,
	PaymentDetailsResponse,
	PaymentHistoryResponse
} from './dto'
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

	@ApiOperation({
		summary: 'Get payment by ID',
		description: 'Returns transaction information by ID'
	})
	@ApiOkResponse({
		type: PaymentDetailsResponse
	})
	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.paymentsService.getById(id)
	}

	@ApiOperation({
		summary: 'Initialize a new payment',
		description: 'Initialize a new payment with the selected provider'
	})
	@ApiOkResponse({
		type: InitPaymentResponse
	})
	@Protected()
	@Post('init')
	async init(@Body() dto: InitPaymentRequest, @Authorized() user: User) {
		return await this.paymentsService.init(dto, user)
	}
}
