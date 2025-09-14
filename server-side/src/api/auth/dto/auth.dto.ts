import { ApiProperty } from '@nestjs/swagger'

export class AuthResponse {
	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1. ...',
		description: 'Access token for authorization'
	})
	accessToken: string
}
