import {
	BadRequestException,
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpStatus,
	Post,
	type RawBodyRequest,
	Req
} from '@nestjs/common'
import type { Request } from 'express'

import { WebhooksService } from './webhooks.service'

@Controller('webhooks')
export class WebhooksController {
	constructor(private readonly webhooksService: WebhooksService) {}

	@Post('yookassa')
	@HttpCode(HttpStatus.OK)
	async handleYookassa(@Body() dto: any) {
		return dto
	}

	@Post('stripe')
	@HttpCode(HttpStatus.OK)
	async handleStripe(
		@Req() req: RawBodyRequest<Request>,
		@Headers('stripe-signature') sig: string
	) {
		if (!sig) throw new BadRequestException('Подпись токена отсутствует')

		return await this.webhooksService.handleStripe(req.rawBody!, sig)
	}

	@Post('cryptopay')
	@HttpCode(HttpStatus.OK)
	async handleCryptopay(
		@Req() req: RawBodyRequest<Request>,
		@Headers('crypto-pay-api-signature') sig: string
	) {
		if (!sig) throw new BadRequestException('Подпись токена отсутствует')

		return await this.webhooksService.handleCryptopay(req.rawBody!, sig)
	}
}
