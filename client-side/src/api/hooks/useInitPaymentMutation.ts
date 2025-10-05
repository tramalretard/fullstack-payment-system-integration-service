import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { initPayment } from '../requests'
import type { InitPaymentRequest, InitPaymentResponse } from '../types'

export function useInitPaymentMutation(
	options?: Omit<
		UseMutationOptions<InitPaymentResponse, unknown, InitPaymentRequest>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['init payment'],
		mutationFn: (data: InitPaymentRequest) => initPayment(data),
		...options
	})
}
