import { ConfigService } from '@nestjs/config'
import { RedisOptions } from 'bullmq'

export function getRedisConfig(configService: ConfigService): RedisOptions {
	return {
		host: configService.getOrThrow<string>('REDIS_HOST'),
		port: configService.getOrThrow<number>('REDIS_PORT'),
		password: configService.getOrThrow<string>('REDIS_PASSWORD')
	}
}
