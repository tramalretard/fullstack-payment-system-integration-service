import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getPaymentHistory } from '../requests'
import type { PaymentHistoryResponse } from '../types'

export function useGetPaymentHistoryQuery(
	options?: Omit<
		UseQueryOptions<PaymentHistoryResponse[], unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get payment history'],
		queryFn: getPaymentHistory,
		...options
	})
}
