'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useRegisterMutation } from '@/api/hooks'

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
	const router = useRouter()

	const { mutate, isPending } = useRegisterMutation({
		onSuccess() {
			router.push('/dashboard')
		}
	})

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: RegisterFormValues) => {
		mutate(values)
	}

	const [showPassword, setShowPassword] = useState(false)

	return (
		<AuthWrapper
			title='Регистрация'
			description='Для регистрации аккаунта заполните форму'
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
									<Input
										placeholder='Иван'
										disabled={isPending}
										{...field}
									/>
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
										disabled={isPending}
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
								<div className='relative'>
									<FormControl>
										<Input
											placeholder='*******'
											disabled={isPending}
											type={
												showPassword
													? 'text'
													: 'password'
											}
											{...field}
										/>
									</FormControl>
									<div
										className='absolute inset-y-0 right-0 flex cursor-pointer items-center p-2'
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? (
											<Eye className='text-muted-foreground h-5 w-5' />
										) : (
											<EyeOff className='text-muted-foreground h-5 w-5' />
										)}
									</div>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						disabled={isPending}
						size='lg'
						className='w-full'
					>
						Продолжить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
