import { ApiProperty } from '@nestjs/swagger'
import { BillingPeriod, PaymentProvider } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class InitPaymentRequest {
	@ApiProperty({
		example: 'cmftwnsmp0001w284repayzcm',
		description: 'ID of the selected tariff plan'
	})
	@IsString({ message: 'ID тарфиного плана должен быть строкой' })
	@IsNotEmpty({ message: 'ID тарифного плана не может быть пустым' })
	planId: string

	@ApiProperty({
		example: BillingPeriod.MONTHLY,
		enum: BillingPeriod,
		description: 'Subscription billing period (monthly or yearly)'
	})
	@IsEnum(BillingPeriod, {
		message: 'Период может быть только MONTHLY или YEARLY'
	})
	billingPeriod: BillingPeriod

	@ApiProperty({
		example: PaymentProvider.YOOKASSA,
		enum: PaymentProvider,
		description: 'Payment provider'
	})
	@IsEnum(PaymentProvider, {
		message: 'Провайдером может быть только YOOKASSA, STRIPE ИЛИ CRYPTOPAY'
	})
	provider: PaymentProvider
}

export class InitPaymentResponse {
	@ApiProperty({
		example: 'https://checkout.stripe.com/j483gsj',
		description: 'URL to redirect the user to the selected payment provider'
	})
	url: string
}
