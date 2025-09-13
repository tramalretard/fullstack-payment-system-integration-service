import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException
} from '@nestjs/common'
import type { User } from '@prisma/client'
import type { Request } from 'express'

export const Authorized = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest() as Request

		const user = request.user as User

		if (!user) {
			throw new UnauthorizedException('Пользователь не авторизован')
		}

		return data ? user[data] : user
	}
)
