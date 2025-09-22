import { Body, Controller, Get, Patch } from '@nestjs/common'
import type { User } from '@prisma/client'
import { Authorized, Protected } from 'src/common/decorators'

import { updateAutoRenewalRequest } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Protected()
	@Get('me')
	async getMe(@Authorized() user: User) {
		return user
	}

	@Protected()
	@Patch('me/auto-renewal')
	async updateAutoRenewal(
		@Authorized() user: User,
		@Body() dto: updateAutoRenewalRequest
	) {
		return await this.usersService.updateAutoRenewal(user, dto)
	}
}
