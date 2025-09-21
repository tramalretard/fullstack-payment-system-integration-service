import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { Job } from 'bullmq'

import { MailService } from './mail.service'

@Processor('mail')
@Injectable()
export class MailProcessor extends WorkerHost {
	private readonly logger = new Logger(MailProcessor.name)

	constructor(private readonly mailService: MailService) {
		super()
	}

	async process(job: Job<{ email: string; subject: string; html: string }>) {
		const { email, subject, html } = job.data

		try {
			await this.mailService.sendMail({ to: email, subject, html })

			this.logger.log(`Письмо успешно отправлено на почту ${email} ✅ `)
		} catch (error) {
			this.logger.error(
				`❌ Ошибка при отправке письма на почту ${email}: ${error.message}`
			)
		}
	}
}
