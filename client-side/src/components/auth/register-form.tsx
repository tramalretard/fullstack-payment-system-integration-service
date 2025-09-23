'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

import { AuthWrapper } from './auth-wrapper'

const registerSchema = z.object({
	name: z.string().min(1, { message: 'Имя обязательно' }),
	email: z.email({ message: 'Введите корректный адрес электронной почты' }),
	password: z
		.string()
		.min(6, { message: 'Минимальная длина пароля - 6 символов' })
		.max(32, {
			message: 'Максимальная длина пароля - 32 символа'
		})
})

export type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: RegisterFormValues) => {
		console.log(values)
	}

	return (
		<AuthWrapper
			title='Регистрация'
			description='Для регистрации заполните форму ниже'
			bottomText='Уже есть аккаунт?'
			bottomTextLink='Войти'
			bottomLinkHref='/auth/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input placeholder='Иван' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='ivanivanov@example.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										placeholder='*******'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' size='lg' className='w-full'>
						Продолжить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
