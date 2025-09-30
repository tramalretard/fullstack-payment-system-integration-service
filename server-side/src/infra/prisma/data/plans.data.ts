import type { Plan } from '@prisma/client'

export const plans: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>[] = [
	{
		title: 'Начальный',
		description:
			'Идеально для индивидуальных разработчиков и небольших стартапов.',
		features: [
			'2 активных проекта',
			'5ГБ облачного хранилища',
			'Доступ к сообществу',
			'Ежемесячные отчеты'
		],
		isPopular: false,
		monthlyPrice: 599,
		yearlyPrice: 5750,
		stripeMonthlyPriceId: 'price_1S7nKpCxyVB5RQvs6pf4Wh46',
		stripeYearlyPriceId: 'price_1S7nKpCxyVB5RQvshswRSk8e'
	},
	{
		title: 'Премиум',
		description:
			'Лучший выбор для растущих команд, которым нужна гибкость и мощь.',
		features: [
			'15 активных проектов',
			'50ГБ облачного хранилища',
			'Приоритетная поддержка 24/7',
			'Расширенная аналитика',
			'Интеграция с Git'
		],
		isPopular: true,
		monthlyPrice: 1899,
		yearlyPrice: 18230,
		stripeMonthlyPriceId: 'price_1S7nM8CxyVB5RQvs460BB66a',
		stripeYearlyPriceId: 'price_1S7nM8CxyVB5RQvsctEQqw6C'
	},
	{
		title: 'Ультра',
		description:
			'Решение для крупных организаций с уникальными потребностями.',
		features: [
			'Неограниченное количество проектов',
			'250ГБ облачного хранилища',
			'Персональный менеджер аккаунта',
			'SLA до 99.9%',
			'Кастомизированные отчеты',
			'Премиум безопасность'
		],
		isPopular: false,
		monthlyPrice: 3999,
		yearlyPrice: 38390,
		stripeMonthlyPriceId: 'price_1S7nMuCxyVB5RQvsvGIgH7gB',
		stripeYearlyPriceId: 'price_1S7nMuCxyVB5RQvsaoCZwv4H'
	}
]
