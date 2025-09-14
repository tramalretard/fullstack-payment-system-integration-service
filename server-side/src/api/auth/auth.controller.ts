import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'

import { AuthService } from './auth.service'
import { AuthResponse, LoginRequest, RegisterRequest } from './dto'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({
		summary: 'New user registration',
		description: 'Register a new account and return access token in response'
	})
	@ApiOkResponse({
		type: AuthResponse
	})
	@Post('register')
	async register(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: RegisterRequest
	) {
		return await this.authService.register(res, dto)
	}

	@ApiOperation({
		summary: 'Login for existing user',
		description:
			'Login to an existing account and return an access token in the response'
	})
	@ApiOkResponse({
		type: AuthResponse
	})
	@Post('login')
	async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: LoginRequest
	) {
		return await this.authService.login(res, dto)
	}

	@ApiOperation({
		summary: 'Logout for existing user',
		description: 'Logout of existing account and delete tokens'
	})
	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		return await this.authService.logout(res)
	}

	@ApiOperation({
		summary: 'Refresh access token',
		description:
			'Generating an access token using a refresh token from cookies'
	})
	@ApiOkResponse({
		type: AuthResponse
	})
	@Post('refresh')
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return await this.authService.refresh(req, res)
	}
}
