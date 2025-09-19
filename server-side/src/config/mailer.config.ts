import type { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export function getMailerConfig(configService: ConfigService): MailerOptions {
	return {
		transport: {
			host: configService.getOrThrow<string>('MAIL_HOST'),
			port: configService.getOrThrow<number>('MAIL_PORT'),
			auth: {
				user: configService.getOrThrow<string>('MAIL_USERNAME'),
				pass: configService.getOrThrow<string>('MAIL_PASSWORD')
			}
		},
		defaults: {
			from: `"Payment-Systems" ${configService.getOrThrow<string>('MAIL_USERNAME')}`
		}
	}
}
