import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDto {
	@IsNotEmpty({ message: 'Пароль не может быть пустым' })
	@IsString({ message: 'Пароль может быть только строкой' })
	@MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
	password: string

	@IsNotEmpty({ message: 'Email не может быть пустым' })
	@IsEmail()
	email: string
}
