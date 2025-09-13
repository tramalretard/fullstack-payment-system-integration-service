import { Controller, Get } from '@nestjs/common'
import type { User } from '@prisma/client'
import { Authorized, Protected } from 'src/common/decorators'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Protected()
	@Get('me')
	async getMe(@Authorized() user: User) {
		return user
	}
}
