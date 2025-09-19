import { TransactionStatus } from '@prisma/client'

export class PaymentsWebhooksResult {
	transactionId: string
	planId: string | null
	paymentId: string
	status: TransactionStatus
	raw: object
}
