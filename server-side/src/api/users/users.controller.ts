import { Body, Controller, Get, Patch } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { Authorized, Protected } from 'src/common/decorators'

import {
	GetMeResponse,
	updateAutoRenewalRequest,
	updateAutoRenewalResponse
} from './dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({
		summary: 'Get user profile',
		description:
			'Return the authorized user with information about their tariff plans'
	})
	@ApiOkResponse({
		type: GetMeResponse
	})
	@Protected()
	@Get('me')
	async getMe(@Authorized('id') id: string) {
		return await this.usersService.getMe(id)
	}

	@ApiOperation({
		summary: 'Change the auto-renewal status of your tariff plan',
		description: 'Disable or enable auto-renewal of user tariff plans'
	})
	@ApiOkResponse({
		type: updateAutoRenewalResponse
	})
	@Protected()
	@Patch('me/auto-renewal')
	async updateAutoRenewal(
		@Authorized() user: User,
		@Body() dto: updateAutoRenewalRequest
	) {
		return await this.usersService.updateAutoRenewal(user, dto)
	}
}
