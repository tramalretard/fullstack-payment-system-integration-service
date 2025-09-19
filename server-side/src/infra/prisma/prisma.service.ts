import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name)

	async onModuleInit() {
		this.logger.log('Инициализация соединения с базой данных... ⏳')

		try {
			await this.$connect()

			this.logger.log('Успешное подключение к базе данных ✅')
		} catch (error) {
			this.logger.error('❌ Ошибка при подключении к базе данных: ', error)
			throw error
		}
	}

	async onModuleDestroy() {
		this.logger.log('Закрытие соединения с базой данных... ⏳')

		try {
			await this.$disconnect()

			this.logger.log('Успешное закрытие соединения с базой данных ✅')
		} catch (error) {
			this.logger.error(
				'❌ Ошибка при закрытии соединения с базой данных: ',
				error
			)
			throw error
		}
	}
}
