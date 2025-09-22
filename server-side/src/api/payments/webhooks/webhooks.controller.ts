import {
	BadRequestException,
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpStatus,
	Ip,
	Post,
	type RawBodyRequest,
	Req
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'

import { YookassaWebhooksDto } from './dto/yookassa-webhooks.dto'
import { WebhooksService } from './webhooks.service'

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhooksController {
	constructor(private readonly webhooksService: WebhooksService) {}

	@ApiOperation({
		summary: 'Handle YooKassa webhook',
		description:
			'Processes incoming Yookassa payment notifications and updates status'
	})
	@Post('yookassa')
	@HttpCode(HttpStatus.OK)
	async handleYookassa(@Body() dto: YookassaWebhooksDto, @Ip() ip: string) {
		return this.webhooksService.handleYookassa(dto, ip)
	}

	@ApiOperation({
		summary: 'Handle Stripe webhook',
		description:
			'Handles incoming Stripe payment events using the signature for verification'
	})
	@Post('stripe')
	@HttpCode(HttpStatus.OK)
	async handleStripe(
		@Req() req: RawBodyRequest<Request>,
		@Headers('stripe-signature') sig: string
	) {
		if (!sig) throw new BadRequestException('Подпись токена отсутствует')

		return await this.webhooksService.handleStripe(req.rawBody!, sig)
	}

	@ApiOperation({
		summary: 'Handle CryptoPay webhook',
		description:
			'Processes CryptoPay payment notifications, verifying the request signature and freshness'
	})
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
