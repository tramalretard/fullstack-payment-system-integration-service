import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class updateAutoRenewalRequest {
	@ApiProperty({
		example: true,
		description: 'Enable or disable auto-renewal'
	})
	@IsBoolean()
	isAutoRenewal: boolean
}

export class updateAutoRenewalResponse {
	@ApiProperty({
		example: true,
		description: 'Enable or disable auto-renewal'
	})
	isAutoRenewal: boolean
}
