import { ApiProperty } from '@nestjs/swagger'
import { BillingPeriod } from '@prisma/client'

class PlanInfo {
	@ApiProperty({
		example: 'cmfhd7bgi0000w2y8y14bo7r8',
		description: 'Unique plan ID'
	})
	id: string

	@ApiProperty({
		example: 'Standard',
		description: 'Tariff plan name'
	})
	title: string

	@ApiProperty({
		description: 'Monthly price',
		example: 10000
	})
	monthlyPrice: number

	@ApiProperty({
		description: 'Yearly price',
		example: 20000
	})
	yearlyPrice: number
}

class SubscriptionInfo {
	@ApiProperty({
		description: 'Detailed information about the selected tariff plan',
		type: PlanInfo
	})
	plan: PlanInfo
}

export class PaymentDetailsResponse {
	@ApiProperty({
		description: 'Unique identifier of the transaction',
		example: 'txn_01ABCDEF'
	})
	id: string

	@ApiProperty({
		description: 'Billing period selected for the tariff plan',
		example: BillingPeriod.MONTHLY,
		enum: BillingPeriod
	})
	billingPeriod: BillingPeriod

	@ApiProperty({
		description: 'Tariff plan information including selected plan details',
		type: SubscriptionInfo
	})
	subscription: SubscriptionInfo
}
