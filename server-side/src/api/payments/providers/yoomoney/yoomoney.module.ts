import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { YookassaModule } from 'nestjs-yookassa'
import { getYookassaConfig } from 'src/config'

import { YoomoneyService } from './yoomoney.service'

@Module({
	imports: [
		YookassaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getYookassaConfig,
			inject: [ConfigService]
		})
	],
	providers: [YoomoneyService],
	exports: [YoomoneyService]
})
export class YoomoneyModule {}
