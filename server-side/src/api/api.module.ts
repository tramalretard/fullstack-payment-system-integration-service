import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PlansModule } from './plans/plans.module';
import { PaymentsModule } from './payments/payments.module';
import { YoomoneyModule } from './payments/providers/yoomoney/yoomoney.module';

@Module({
	imports: [AuthModule, UsersModule, PlansModule, PaymentsModule, YoomoneyModule]
})
export class ApiModule {}
