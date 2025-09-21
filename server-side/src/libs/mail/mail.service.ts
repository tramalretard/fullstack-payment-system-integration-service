import { type ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Transaction, User } from '@prisma/client'
import { render } from '@react-email/components'
import { Queue } from 'bullmq'

import {
	PaymentFailedTemplate,
	PaymentSuccessTemplate,
	SubscriptionExpiredTemplate
} from './templates'

@Injectable()
export class MailService {
	private readonly logger = new Logger(MailService.name)
	private readonly CLIENT_URL: string

	constructor(
		private readonly mailerService: MailerService,
		@InjectQueue('mail') private readonly queue: Queue,
		private readonly configService: ConfigService
	) {
		this.CLIENT_URL = this.configService.getOrThrow<string>('CLIENT_URL')
	}

	async sendPaymentSuccessMail(user: User, transaction: Transaction) {
		const html = await render(PaymentSuccessTemplate({ transaction }))

		await this.queue.add(
			'Отправить-письмо',
			{
				email: user.email,
				subject: 'Платеж выполнен успешно!',
				html
			},
			{ removeOnComplete: true }
		)
	}

	async sendPaymentFailedMail(user: User, transaction: Transaction) {
		const html = await render(PaymentFailedTemplate({ transaction }))

		await this.queue.add(
			'Отправить-письмо',
			{
				email: user.email,
				subject: 'Ошибка при обработке платежа!',
				html
			},
			{ removeOnComplete: true }
		)
	}

	async sendSubscriptionExpiredMail(user: User) {
		const accountUrl = `${this.CLIENT_URL}/dashboard`

		const html = await render(SubscriptionExpiredTemplate({ accountUrl }))

		await this.queue.add(
			'Отправить-письмо',
			{
				email: user.email,
				subject: 'Ваш тарифный план закончился!',
				html
			},
			{ removeOnComplete: true }
		)
	}

	async sendMail(options: ISendMailOptions) {
		try {
			await this.mailerService.sendMail(options)
		} catch (error) {
			this.logger.error(`Ошибка при отправке письма: ${error}`)
			throw error
		}
	}
}
