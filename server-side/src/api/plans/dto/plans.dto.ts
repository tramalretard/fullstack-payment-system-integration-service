import { ApiProperty } from '@nestjs/swagger'

export class PlansResponse {
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
		example: 'Description of the tariff plan',
		description: 'Full access to ...'
	})
	description: string

	@ApiProperty({
		example: ['Unlimited access', 'Priority support'],
		description: 'Features available in the tariff plan',
		isArray: true
	})
	features: string[]

	@ApiProperty({
		example: 10000,
		description: 'Monthly price'
	})
	monthlyPrice: number

	@ApiProperty({
		example: 20000,
		description: 'Early price'
	})
	earlyPrice: number

	@ApiProperty({
		example: true,
		description: 'Indicates whether the tariff plan is popular'
	})
	isPopular: boolean
}
