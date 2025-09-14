import { Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { plans } from './data'
import { PrismaService } from './prisma.service'

const prisma = new PrismaClient()

async function main() {
	const logger = new Logger(PrismaService.name)

	try {
		logger.log('Seeding database')

		await prisma.plan.deleteMany()

		await prisma.plan.createMany({
			data: plans
		})

		logger.log('Seeding finished')
	} catch (error) {
		logger.error('Failed to seed the database', error)
	}
}

main()
