import {
	PaymentHistoryResponseStatus,
	SubscriptionResponseStatus
} from '@/api/types'

import { Badge } from '../ui/badge'

interface PaymentStatusBadgeProps {
	status: PaymentHistoryResponseStatus
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
	switch (status) {
		case PaymentHistoryResponseStatus.SUCCEEDED:
			return <Badge variant='success'>Успешный</Badge>
		case PaymentHistoryResponseStatus.FAILED:
			return <Badge variant='error'>Ошибка</Badge>
		case PaymentHistoryResponseStatus.PENDING:
			return <Badge variant='warning'>В обработке</Badge>
		default:
			return <Badge variant='neutral'>{status}</Badge>
	}
}

interface SubscriptionStatusBadgeProps {
	status: SubscriptionResponseStatus
}

export function SubscriptionStatusBadge({
	status
}: SubscriptionStatusBadgeProps) {
	switch (status) {
		case SubscriptionResponseStatus.ACTIVE:
			return <Badge variant='success'>Активна</Badge>
		case SubscriptionResponseStatus.EXPIRED:
			return <Badge variant='warning'>Истекла</Badge>
		case SubscriptionResponseStatus.PENDING_PAYMENT:
			return <Badge variant='neutral'>Ожидает оплаты</Badge>
		default:
			return <Badge variant='neutral'>{status}</Badge>
	}
}
