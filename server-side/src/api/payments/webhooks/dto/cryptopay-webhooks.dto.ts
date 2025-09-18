import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

import {
	AcceptedCryptoAsset,
	Currency,
	InvoiceStatus
} from '../../providers/cryptopay/interfaces'

export enum UpdateType {
	INVOICE_PAID = 'invoice_paid'
}

export class CryptopayPayload {
	@IsNumber()
	public invoice_id: number

	@IsString()
	public hash: string

	@IsEnum(Currency)
	public currency_type: Currency

	@IsString()
	public fiat: string

	@IsNumberString()
	public amount: string

	@IsString()
	public paid_asset: string

	@IsNumberString()
	public paid_amount: string

	@IsArray()
	@IsEnum(AcceptedCryptoAsset, { each: true })
	public accepted_assets: AcceptedCryptoAsset[]

	@IsString()
	public fee_asset: string

	@IsNumberString()
	public fee_amount: string

	@IsNumberString()
	public fee: string

	@IsNumberString()
	public fee_in_usd: string

	@IsString()
	public pay_url: string

	@IsString()
	public bot_invoice_url: string

	@IsString()
	public mini_app_invoice_url: string

	@IsString()
	public web_app_invoice_url: string

	@IsString()
	public description: string

	@IsEnum(InvoiceStatus)
	public status: InvoiceStatus

	@IsString()
	public created_at: string

	@IsBoolean()
	public allow_comments: boolean

	@IsBoolean()
	public allow_anonymous: boolean

	@IsNumberString()
	public paid_usd_rate: string

	@IsNumberString()
	public usd_rate: string

	@IsOptional()
	@IsString()
	public paid_at?: string

	@IsBoolean()
	public paid_anonymously: boolean

	@IsOptional()
	@IsString()
	public hidden_message?: string

	@IsOptional()
	@IsString()
	public payload?: string

	@IsOptional()
	@IsString()
	public paid_btn_name?: string

	@IsOptional()
	@IsString()
	public paid_btn_url?: string
}

export class CryptopayWebhooksDto {
	@IsNumberString()
	public update_id: string | number

	@IsEnum(UpdateType)
	public update_type: UpdateType

	@IsString()
	public request_date: string

	@ValidateNested()
	@Type(() => CryptopayPayload)
	public payload: CryptopayPayload
}
