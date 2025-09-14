import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from './../../infra/prisma/prisma.service'

@Injectable()
export class PlansService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		const plans = await this.prismaService.plan.findMany({
			orderBy: {
				monthlyPrice: 'asc'
			},
			select: {
				id: true,
				title: true,
				description: true,
				features: true,
				monthlyPrice: true,
				yearlyPrice: true,
				isPopular: true
			}
		})

		return plans
	}

	async getById(id: string) {
		const plan = await this.prismaService.plan.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				title: true,
				description: true,
				features: true,
				monthlyPrice: true,
				yearlyPrice: true,
				isPopular: true
			}
		})

		if (!plan) throw new NotFoundException('Данный план не найден')

		return plan
	}
}
