import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'

export function getCorsConfig(configService: ConfigService): CorsOptions {
	return {
		origin: configService.getOrThrow<string>('CLIENT_CORS').split(', '),
		credentials: true
	}
}
