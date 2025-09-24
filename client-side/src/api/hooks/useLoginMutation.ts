import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { LoginFormValues } from '@/components/auth/login-form'

import { login } from '../requests'

export function useLoginMutation(
	options?: Omit<
		UseMutationOptions<void, unknown, LoginFormValues>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['login'],
		mutationFn: (data: LoginFormValues) => login(data),
		...options
	})
}
