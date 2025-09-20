import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getBullMqConfig } from 'src/config'

import { MailModule } from './mail/mail.module'

@Module({
	imports: [
		BullModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getBullMqConfig,
			inject: [ConfigService]
		}),
		MailModule
	]
})
export class LibsModule {}
