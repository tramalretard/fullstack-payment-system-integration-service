import { ApiProperty } from '@nestjs/swagger'
import { SubscriptionStatus } from '@prisma/client'
import { PlansResponse } from 'src/api/plans/dto'

class SubscriptionResponse {
	@ApiProperty({
		example: SubscriptionStatus.ACTIVE,
		description: 'Current subscription status',
		enum: SubscriptionStatus
	})
	status: SubscriptionStatus

	@ApiProperty({
		example: '2025-06-13T00:00:00.000Z',
		description: 'Subscription start date'
	})
	startDate: Date

	@ApiProperty({
		example: '2026-06-13T00:00:00.000Z',
		description: 'Subscription end date'
	})
	endDate: Date

	@ApiProperty({ type: PlansResponse })
	plan: PlansResponse
}

export class GetMeResponse {
	@ApiProperty({ example: 'user_01', description: 'User ID' })
	id: string

	@ApiProperty({ example: 'John Doe', description: 'User full name' })
	name: string

	@ApiProperty({
		example: 'john@example.com',
		description: 'User email address'
	})
	email: string

	@ApiProperty({
		example: true,
		description: 'Whether auto-renewal is enabled'
	})
	isAutoRenewal: boolean

	@ApiProperty({ type: SubscriptionResponse, required: false })
	subscription?: SubscriptionResponse
}
