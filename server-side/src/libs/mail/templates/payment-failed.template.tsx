import * as React from 'react'
import { Html, Body, Container, Head, Preview, Tailwind, Heading, Text, Font } from "@react-email/components";
import type { Transaction } from '@prisma/client';
import { formatTransactionDate, getProviderName } from 'src/common/utils/payment';

export interface PaymentFailedTemplateProps {
	transaction: Transaction
}

export function PaymentFailedTemplate({
	transaction
}: PaymentFailedTemplateProps) {
	return (
		<Html>
			<Head>
				<Font
					fontFamily='Montserrat'
					fallbackFontFamily='Arial'
					webFont={{
					url: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
					format: 'woff2'
					}}
				/>
      		</Head>
			<Tailwind>
				<Preview>Ошибка при обработке платежа.</Preview>
				
				<Body className='bg-gray-50 font-sans text-gray-700'>
					<Container className='max-w-2xl mx-auto bg-white rounded-md shadow-md'>
						<div className='relative px-8 py-16 overflow-hidden'>
							<div className='relative text-center'>
								<Heading className='mb-2 text-2xl font-bold text-slate-900'>
									Ошибка при обработке платежа!
								</Heading>
								<Text className='text-base text-slate-500'>
									Произошла ошибка при обработке платежа. Повторите попытку позже.
								</Text>
							</div>

							<div className='p-8 mt-8 bg-gray-100 rounded-xl'>
								<Heading className='mb-6 text-xl font-semibold text-slate-900'>
									Детали транзакции
								</Heading>

								<div className='mb-3 flex justify-between text-sm text-slate-500'>
									<span>Идентификатор транзакции:</span>{' '}
									<span className='font-mono text-slate-900'>{transaction.id}</span>
								</div>

								<div className='mb-3 flex justify-between text-sm text-slate-500'>
									<span>Дата транзакции:</span>{' '}
									<span className='text-slate-900'>{formatTransactionDate(transaction.createdAt)}</span>
								</div>

								<div className='mb-6 flex justify-between text-sm text-slate-500'>
									<span>Способ оплаты:</span>{' '}
									<span className='text-slate-900'>{getProviderName(transaction.provider)}</span>
								</div>

								<div className='flex justify-between pt-3 border-t border-gray-300'>
									<span className='text-lg font-semibold text-slate-900'>
										Сумма:
									</span>{' '}
									<span className='text-lg font-bold text-slate-900'>
										{transaction.amount} ₽
									</span>
								</div>
							</div>

							<div className='mt-10 text-center'>
								<Text className='text-sm text-slate-500'>
									Если проблема сохраняется, обратитесь в поддержку или повторите попытку позже.
								</Text>
							</div>
						</div>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
