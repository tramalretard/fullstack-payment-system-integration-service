import {
	AcceptedCryptoAsset,
	CryptoAsset,
	FiatCurrency
} from './common.interface'

export enum Currency {
	CRYPTO = 'crypto',
	FIAT = 'fiat'
}

export enum PaidButtonName {
	VIEW_ITEM = 'viewItem',
	OPEN_CHANNEL = 'openChannel',
	OPEN_BOT = 'openBot',
	CALLBACK = 'callback'
}

export interface CreateInvoiceRequest {
	currency_type: Currency
	asset?: CryptoAsset
	fiat?: FiatCurrency
	accepted_assets?: AcceptedCryptoAsset
	amount: number
	description?: string
	hidden_message?: string
	paid_btn_name?: PaidButtonName
	paid_btn_url?: string
	payload?: string
	allow_comments?: boolean
	allow_anonymous?: boolean
	expires_in?: number
}

export enum InvoiceStatus {
	ACTIVE = 'active',
	PAID = 'paid',
	EXPIRED = 'expired'
}

export interface CreateInvoiceResponse {
	invoice_id: number
	hash: string
	currency_type: Currency
	asset?: CryptoAsset
	fiat?: FiatCurrency
	amount: number
	paid_asset?: string
	paid_amount?: string
	paid_fiat_rate?: string
	paid_usd_rate?: string
	usd_rate?: string
	accepted_assets?: string
	fee_asset?: string
	fee_amount: number
	fee?: string
	pay_url: string
	bot_invoice_url: string
	mini_app_invoice_url: string
	web_app_invoice_url: string
	description?: string
	status: InvoiceStatus
	created_at: string
	expiration_date?: string
	paid_at?: string
	allow_comments?: boolean
	allow_anonymous?: boolean
	paid_anonymously?: boolean
	comment?: string
	hidden_message?: string
	payload?: string
	paid_btn_name?: PaidButtonName
	paid_btn_url?: string
}
