import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsEnum,
	IsNumberString,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import { PaymentMethodsEnum, PaymentStatusEnum } from 'nestjs-yookassa'

export class CardProduct {
	@IsString()
	public code: string
}

export class Card {
	@IsString()
	public first6: string

	@IsString()
	public last4: string

	@IsString()
	public expiry_year: string

	@IsString()
	public expiry_month: string

	@IsString()
	public card_type: string

	@IsOptional()
	@ValidateNested()
	@Type(() => CardProduct)
	public card_product?: CardProduct

	@IsString()
	@IsOptional()
	public issuer_country?: string
}

export class PaymentMethod {
	@IsEnum(PaymentMethodsEnum)
	public type: PaymentMethodsEnum

	@IsString()
	public id: string

	@IsBoolean()
	public saved: boolean

	@IsString()
	public status: string

	@IsString()
	public title: string

	@IsOptional()
	@ValidateNested()
	@Type(() => Card)
	public card?: Card
}

export class Amount {
	@IsNumberString()
	public value: string

	@IsString()
	public currency: string
}

export class Recipient {
	@IsString()
	public account_id: string

	@IsString()
	public gateway_id: string
}

export class ThreeDSecure {
	@IsBoolean()
	public applied: boolean

	@IsBoolean()
	public method_completed: boolean

	@IsBoolean()
	public challenge_completed: boolean
}

export class AuthorizationDetails {
	@IsOptional()
	@IsString()
	public rrn?: string

	@IsOptional()
	@IsString()
	public auth_code?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => ThreeDSecure)
	public three_d_secure?: ThreeDSecure
}

export class PaymentObject {
	@IsString()
	public id: string

	@IsEnum(PaymentStatusEnum)
	public status: PaymentStatusEnum

	@ValidateNested()
	@Type(() => Amount)
	public amount: Amount

	@IsOptional()
	@ValidateNested()
	@Type(() => Amount)
	public income_amount?: Amount

	@IsOptional()
	@ValidateNested()
	@Type(() => Amount)
	public refunded_amount?: Amount

	@IsString()
	public description: string

	@ValidateNested()
	@Type(() => Recipient)
	public recipient: Recipient

	@ValidateNested()
	@Type(() => PaymentMethod)
	public payment_method: PaymentMethod

	@IsOptional()
	@IsString()
	public captured_at?: string

	@IsString()
	public created_at: string

	@IsOptional()
	@IsString()
	public expires_at?: string

	@IsBoolean()
	public test: boolean

	@IsBoolean()
	public paid: boolean

	@IsBoolean()
	public refundable: boolean

	@IsOptional()
	@IsObject()
	public metadata?: Record<string, any>

	@IsOptional()
	@ValidateNested()
	@Type(() => AuthorizationDetails)
	public authorization_details?: AuthorizationDetails
}

export class YookassaWebhooksDto {
	@IsString()
	public type: string

	@IsString()
	public event: string

	@ValidateNested()
	@Type(() => PaymentObject)
	public object: PaymentObject
}
