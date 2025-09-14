import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { PlansResponse } from './dto'
import { PlansService } from './plans.service'

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
	constructor(private readonly plansService: PlansService) {}

	@ApiOperation({
		summary: 'Get all tariff plans',
		description: 'Returns all available tariff plans sorted by price/month'
	})
	@ApiOkResponse({
		type: [PlansResponse]
	})
	@Get()
	async getAll() {
		return await this.plansService.getAll()
	}

	@ApiOperation({
		summary: 'Get tariff plans by ID',
		description: 'Return available plan by ID'
	})
	@ApiOkResponse({
		type: PlansResponse
	})
	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.plansService.getById(id)
	}
}
