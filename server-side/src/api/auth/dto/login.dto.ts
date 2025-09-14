import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginRequest {
	@ApiProperty({
		example: 'Password string',
		description: 'Account password'
	})
	@IsNotEmpty({ message: 'Пароль не может быть пустым' })
	@IsString({ message: 'Пароль может быть только строкой' })
	@MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
	password: string

	@ApiProperty({
		example: 'john@example.com',
		description: 'User mail'
	})
	@IsNotEmpty({ message: 'Email не может быть пустым' })
	@IsEmail()
	email: string
}
