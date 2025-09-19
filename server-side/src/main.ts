import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { getCorsConfig, getSwaggerConfig } from './config'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		rawBody: true
	})

	const config = app.get(ConfigService)
	const logger = new Logger(AppModule.name)

	app.enableCors(getCorsConfig(config))
	app.useGlobalPipes(new ValidationPipe())
	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))
	app.set('trust proxy', true)

	const swaggerConfig = getSwaggerConfig()
	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

	SwaggerModule.setup('/docs', app, swaggerDocument, {
		jsonDocumentUrl: 'openapi.json'
	})

	const port = config.getOrThrow<number>('SERVER_PORT')
	const host = config.getOrThrow<string>('SERVER_HOST')

	try {
		await app.listen(port)

		logger.log(`Сервер успешно запущен на: ${host}`)
	} catch (error) {
		logger.error(`Не удалось запустить сервер: ${error.message}`, error)
		process.exit(1)
	}
}
bootstrap()
