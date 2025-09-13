import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../guards'

export const Protected = () => UseGuards(JwtAuthGuard)
