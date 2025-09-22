import { Module } from '@nestjs/common'

import { StripeModule } from '../payments/providers/stripe/stripe.module'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [StripeModule],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule {}
