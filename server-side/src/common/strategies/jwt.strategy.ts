import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/infra/prisma/prisma.service'

import { JwtPayload } from './../../api/auth/interfaces/jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
			algorithms: ['HS256']
		})
	}

	async validate(payload: JwtPayload) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: payload.id
			}
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}
}
