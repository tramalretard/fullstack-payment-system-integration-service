import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { toggleAuthRenewal } from '../requests'
import type {
	UpdateAutoRenewalRequest,
	UpdateAutoRenewalResponse
} from '../types'

export function useToggleAutoRenewalMutation(
	options?: Omit<
		UseMutationOptions<
			UpdateAutoRenewalResponse,
			unknown,
			UpdateAutoRenewalRequest
		>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['toggle auto renewal'],
		mutationFn: (data: UpdateAutoRenewalRequest) => toggleAuthRenewal(data),
		...options
	})
}
