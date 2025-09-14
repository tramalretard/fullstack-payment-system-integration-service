import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { Request, Response } from 'express'
import { isDev, ms, StringValue } from 'src/common/utils'
import { PrismaService } from 'src/infra/prisma/prisma.service'

import { LoginRequest, RegisterRequest } from './dto'
import { JwtPayload } from './interfaces'

@Injectable()
export class AuthService {
	private readonly JWT_ACCESS_TOKEN_TTL: StringValue
	private readonly JWT_REFRESH_TOKEN_TTL: StringValue

	private readonly COOKIES_DOMAIN: string

	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService
	) {
		this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<StringValue>(
			'JWT_ACCESS_TOKEN_TTL'
		)
		this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<StringValue>(
			'JWT_REFRESH_TOKEN_TTL'
		)

		this.COOKIES_DOMAIN = configService.getOrThrow<string>('COOKIES_DOMAIN')
	}

	async register(res: Response, dto: RegisterRequest) {
		const { name, password, email } = dto

		const isExists = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})

		if (isExists)
			throw new ConflictException(
				'Пользователь с таким email уже зарегистрирован'
			)

		const hashPassword = await hash(password)

		const user = await this.prismaService.user.create({
			data: {
				name,
				password: hashPassword,
				email
			}
		})

		return this.auth(res, user)
	}

	async login(res: Response, dto: LoginRequest) {
		const { email, password } = dto

		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})

		if (!user) throw new NotFoundException('Неверный email или пароль')

		const isValidPassword = await verify(user.password, password)

		if (!isValidPassword)
			throw new NotFoundException('Неверный email или пароль')

		return this.auth(res, user)
	}

	async refresh(req: Request, res: Response) {
		if (!req || !req.cookies)
			throw new UnauthorizedException('Не удалось получить refresh токен')

		const refreshToken = req.cookies['refreshToken']

		if (refreshToken) {
			const payload: JwtPayload =
				await this.jwtService.verifyAsync(refreshToken)

			if (payload) {
				const user = await this.prismaService.user.findUnique({
					where: {
						id: payload.id
					}
				})

				if (user) return this.auth(res, user)
			}
		}
	}

	async logout(res: Response) {
		this.setCookie(res, '', new Date())
	}

	private async auth(res: Response, user: User) {
		const { accessToken, refreshToken, refreshTokenExpires } =
			await this.generateTokens(user)

		this.setCookie(res, refreshToken, refreshTokenExpires)

		return { accessToken }
	}

	private async generateTokens(user: User) {
		const payload: JwtPayload = {
			id: user.id
		}

		const refreshTokenExpires = new Date(
			Date.now() + ms(this.JWT_REFRESH_TOKEN_TTL)
		)

		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.JWT_ACCESS_TOKEN_TTL
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.JWT_REFRESH_TOKEN_TTL
		})

		return {
			accessToken,
			refreshToken,
			refreshTokenExpires
		}
	}

	private setCookie(res: Response, value: string, expires: Date) {
		res.cookie('refreshToken', value, {
			httpOnly: true,
			domain: this.COOKIES_DOMAIN,
			expires,
			secure: !isDev(this.configService),
			sameSite: 'lax'
		})
	}
}
