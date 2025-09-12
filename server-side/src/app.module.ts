import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { InfraModule } from './infra/infra.module'
import { PrismaModule } from './infra/prisma/prisma.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		InfraModule,
		PrismaModule
	]
})
export class AppModule {}
