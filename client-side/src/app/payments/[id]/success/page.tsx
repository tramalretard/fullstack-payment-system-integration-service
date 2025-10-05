import { CheckCircleIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPaymentById } from '@/api/requests'
import { PaymentDetailsResponseBillingPeriod } from '@/api/types'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
	title: 'Успешная оплата'
}

export default async function PaymentSuccessPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	const payment = await getPaymentById(id).catch(() => notFound())

	const plan = payment.subscription.plan

	const price =
		payment.billingPeriod === PaymentDetailsResponseBillingPeriod.MONTHLY
			? plan.monthlyPrice
			: plan.yearlyPrice
	const periodShort =
		payment.billingPeriod === PaymentDetailsResponseBillingPeriod.MONTHLY
			? 'в месяц'
			: 'в год'
	const period =
		payment.billingPeriod === PaymentDetailsResponseBillingPeriod.MONTHLY
			? 'Ежемесячно'
			: 'Ежегодно'

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='w-full max-w-md'>
				<Card className='bg-foreground/5 border-0 text-center shadow-lg'>
					<CardContent className='p-8'>
						<div className='mb-6'>
							<div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100'>
								<CheckCircleIcon className='size-8 text-green-600' />
							</div>
							<h1 className='text-foreground mb-2 text-2xl font-bold'>
								Платеж выполнен успешно!
							</h1>
							<p className='text-muted-foreground'>
								Тарифный план подключен.
							</p>
						</div>

						<div className='bg-foreground/3 rounded-lg p-4 text-left'>
							<h3 className='mb-2 font-semibold'>
								Детали транзакции:
							</h3>
							<div className='text-muted-foreground mb-6 space-y-1 text-sm'>
								<div className='flex justify-between'>
									<span>Тарифный план:</span>
									<span className='font-medium'>
										{plan.title}
									</span>
								</div>
								<div className='flex justify-between'>
									<span>Стоимость:</span>
									<span className='font-medium'>
										{price}&#8381; / {periodShort}
									</span>
								</div>
								<div className='flex justify-between'>
									<span>Период оплаты:</span>
									<span className='font-medium'>
										{period}
									</span>
								</div>
								<div className='flex justify-between'>
									<span>ID транзакции:</span>
									<span className='font-mono text-xs'>
										{payment.id}
									</span>
								</div>
							</div>

							<Button size='lg' className='w-full' asChild>
								<Link href='/dashboard'>
									Перейти в личный кабинет
								</Link>
							</Button>

							<p className='text-muted-foreground mt-6 text-center text-xs'>
								Чек отправлен на Вашу электронную почту. Если у
								вас остались вопросы, обратитесь в поддержку.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
