import { BitcoinIcon, CreditCardIcon, GlobeIcon } from 'lucide-react'

import { InitPaymentRequestProvider } from '@/api/types'

import { PaymentMethod } from '@/types'

export const paymentMethods: PaymentMethod[] = [
	{
		id: InitPaymentRequestProvider.YOOKASSA,
		name: 'Карты РФ',
		description: 'Оплата картами российских банков',
		icon: CreditCardIcon,
		bg: 'bg-black-50',
		textColor: 'text-black-500'
	},
	{
		id: InitPaymentRequestProvider.STRIPE,
		name: 'Международные карты',
		description: 'Visa, Mastercard, American Express и т.д.',
		icon: GlobeIcon,
		bg: 'bg-black-50',
		textColor: 'text-black-500'
	},
	{
		id: InitPaymentRequestProvider.CRYPTOPAY,
		name: 'Криптовалюта',
		description: 'Bitcoin, Ethereum, USDT и т.д.',
		icon: BitcoinIcon,
		bg: 'bg-black-50',
		textColor: 'text-black-500'
	}
]
