import { BillingPeriod, PaymentProvider } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class InitPaymentRequest {
	@IsString({ message: 'ID тарфиного плана должен быть строкой' })
	@IsNotEmpty({ message: 'ID тарифного плана не может быть пустым' })
	planId: string

	@IsEnum(BillingPeriod, {
		message: 'Период может быть только MONTHLY или YEARLY'
	})
	billingPeriod: BillingPeriod

	@IsEnum(PaymentProvider, {
		message: 'Провайдером может быть только YOOKASSA, STRIPE ИЛИ CRYPTOPAY'
	})
	provider: PaymentProvider
}
