import { TransactionStatus } from '@prisma/client'

export class PaymentsWebhooksResult {
	transactionId: string
	planId: string
	paymentId: string
	status: TransactionStatus
	raw: object
}
