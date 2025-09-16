export enum CryptoAsset {
	USDT = 'USDT', // Стейблкоин USDT (Tether)
	BTC = 'BTC', // Биткоин
	ETH = 'ETH', // Эфириум
	LTC = 'LTC', // Лайткоин
	BNB = 'BNB', // Binance Coin
	TRX = 'TRX', // Tron
	TON = 'TON', // Toncoin
	USDC = 'USDC' // Стейблкоин USDC
}

export enum FiatCurrency {
	USD = 'USD', // Доллар США
	EUR = 'EUR', // Евро
	RUB = 'RUB', // Российский рубль
	BYN = 'BYN', // Белорусский рубль
	UAH = 'UAH', // Украинская гривна
	GBP = 'GBP', // Фунт стерлингов
	CNY = 'CNY', // Китайский юань
	KZT = 'KZT', // Казахстанский тенге
	UZS = 'UZS', // Узбекский сум
	GEL = 'GEL', // Грузинский лари
	TRY = 'TRY', // Турецкая лира
	AMD = 'AMD', // Армянский драм
	THB = 'THB', // Тайский бат
	INR = 'INR', // Индийская рупия
	BRL = 'BRL', // Бразильский реал
	IDR = 'IDR', // Индонезийская рупия
	AZN = 'AZN', // Азербайджанский манат
	AED = 'AED', // Дирхам ОАЭ
	PLN = 'PLN', // Польский злотый
	ILS = 'ILS' // Израильский шекель
}

export enum AcceptedCryptoAsset {
	USDT = 'USDT', // USDT
	TON = 'TON', // Toncoin
	BTC = 'BTC', // Биткоин
	ETH = 'ETH', // Эфириум
	LTC = 'LTC', // Лайткоин
	BNB = 'BNB', // Binance Coin
	TRX = 'TRX', // Tron
	USDC = 'USDC', // USD Coin
	JET = 'JET' // Jetton
}

export interface CryptoResponse<T> {
	ok: boolean
	result: T
}
