import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { getCorsConfig } from './config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const logger = new Logger(AppModule.name)

	app.enableCors(getCorsConfig(config))

	const port = config.getOrThrow<number>('SERVER_PORT')
	const host = config.getOrThrow<string>('SERVER_HOST')

	try {
		await app.listen(port)

		logger.log(`The server is running on: ${host}`)
	} catch (error) {
		logger.error(`The server failed to start: ${error.message}`, error)
		process.exit(1)
	}
}
bootstrap()
