import { ApiProperty } from '@nestjs/swagger'
import { PaymentProvider, TransactionStatus } from '@prisma/client'

export class PaymentHistoryResponse {
	@ApiProperty({
		example: 'cmfk14xl00001w230czkt6xg3',
		description: 'Payment ID'
	})
	id: string

	@ApiProperty({
		example: '2025-09-14T18:29:38.434Z',
		description: 'Transaction creation date'
	})
	createdAt: Date

	@ApiProperty({
		example: 'Standard',
		description: 'Tariff plan name'
	})
	plan: string

	@ApiProperty({
		example: 1899,
		description: 'Transaction amount'
	})
	amount: number

	@ApiProperty({
		example: PaymentProvider.YOOKASSA,
		enum: PaymentProvider,
		description: 'The payment provider used for the transaction'
	})
	provider: PaymentProvider

	@ApiProperty({
		example: TransactionStatus.PENDING,
		enum: TransactionStatus,
		description: 'Transaction status'
	})
	status: TransactionStatus
}
