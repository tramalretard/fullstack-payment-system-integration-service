import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { RegisterFormValues } from '@/components/auth/register-form'

import { register } from '../requests'

export function useRegisterMutation(
	options?: Omit<
		UseMutationOptions<void, unknown, RegisterFormValues>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['register'],
		mutationFn: (data: RegisterFormValues) => register(data),
		...options
	})
}
