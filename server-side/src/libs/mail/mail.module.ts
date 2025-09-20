import { MailerModule } from '@nestjs-modules/mailer'
import { BullModule } from '@nestjs/bullmq'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getMailerConfig } from 'src/config'

import { MailProcessor } from './mail.processor'
import { MailService } from './mail.service'

@Global()
@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailerConfig
		}),
		BullModule.registerQueue({
			name: 'mail'
		})
	],
	providers: [MailService, MailProcessor],
	exports: [MailService]
})
export class MailModule {}
