import { type ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import type { Transaction, User } from '@prisma/client'
import { render } from '@react-email/components'

import { PaymentFailedTemplate, PaymentSuccessTemplate } from './templates'

@Injectable()
export class MailService {
	private readonly logger = new Logger(MailService.name)

	constructor(private readonly mailerService: MailerService) {}

	async sendPaymentSuccessMail(user: User, transaction: Transaction) {
		const html = await render(PaymentSuccessTemplate({ transaction }))

		await this.mailerService.sendMail({
			to: user.email,
			subject: 'Платеж выполнен успешно!',
			html
		})
	}

	async sendPaymentFailedMail(user: User, transaction: Transaction) {
		const html = await render(PaymentFailedTemplate({ transaction }))

		await this.mailerService.sendMail({
			to: user.email,
			subject: 'Ошибка при обработке платежа!',
			html
		})
	}

	private async sendMail(options: ISendMailOptions) {
		try {
			await this.mailerService.sendMail(options)
		} catch (error) {
			this.logger.error(`Ошибка при отправке письма: ${error}`)
			throw error
		}
	}
}
