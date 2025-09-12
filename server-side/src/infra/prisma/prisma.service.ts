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
		this.logger.log('Initializing a connection to a database... ⏳')

		try {
			await this.$connect()

			this.logger.log('Successful connection to the database ✅')
		} catch (error) {
			this.logger.error('❌ Failed to connect to the database: ', error)
			throw error
		}
	}

	async onModuleDestroy() {
		this.logger.log('Closing the database connection... ⏳')

		try {
			await this.$disconnect()

			this.logger.log('Successfully closed the database connection ✅')
		} catch (error) {
			this.logger.error('❌ Error closing database connection: ', error)
			throw error
		}
	}
}
