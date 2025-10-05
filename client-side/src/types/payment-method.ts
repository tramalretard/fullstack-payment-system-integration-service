import type { LucideIcon } from 'lucide-react'

import type { InitPaymentRequestProvider } from '@/api/types'

export interface PaymentMethod {
	id: InitPaymentRequestProvider
	name: string
	description: string
	icon: LucideIcon
	bg: string
	textColor: string
}
