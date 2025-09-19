import { Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { plans } from './data'
import { PrismaService } from './prisma.service'

const prisma = new PrismaClient()

async function main() {
	const logger = new Logger(PrismaService.name)

	try {
		logger.log('Запуск сидирования базы данных... ⏳')

		await prisma.plan.deleteMany()

		await prisma.plan.createMany({
			data: plans
		})

		logger.log('Успешное сидирование базы данных ✅')
	} catch (error) {
		logger.error('❌ Ошибка при сидировании базы данных:', error)
	}
}

main()
