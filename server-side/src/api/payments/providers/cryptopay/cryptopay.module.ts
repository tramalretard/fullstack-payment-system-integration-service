import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { CryptopayService } from './cryptopay.service'

@Module({
	imports: [HttpModule.register({})],
	providers: [CryptopayService],
	exports: [CryptopayService]
})
export class CryptopayModule {}
