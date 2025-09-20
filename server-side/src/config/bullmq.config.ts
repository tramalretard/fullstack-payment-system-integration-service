import { ConfigService } from '@nestjs/config'
import type { QueueOptions } from 'bullmq'

import { getRedisConfig } from './redis.config'

export function getBullMqConfig(configService: ConfigService): QueueOptions {
	return {
		connection: {
			maxRetriesPerRequest: 5,
			retryStrategy: times => Math.min(times * 100, 2000),
			...getRedisConfig(configService)
		},
		prefix: configService.getOrThrow<string>('QUEUE_PREFIX')
	}
}
