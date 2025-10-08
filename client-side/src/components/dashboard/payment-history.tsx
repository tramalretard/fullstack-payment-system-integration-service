'use client'

import { CreditCard, Download } from 'lucide-react'
import * as xlsx from 'xlsx'

import { useGetPaymentHistoryQuery } from '@/api/hooks'
import { PaymentHistoryResponseProvider } from '@/api/types'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { formatDate } from '@/lib/utils'

import { Skeleton } from '../ui/skeleton'

import { PaymentStatusBadge } from './badges'

export function PaymentHistory() {
	const { data: payments, isLoading } = useGetPaymentHistoryQuery()

	const providerNames: Record<PaymentHistoryResponseProvider, string> = {
		YOOKASSA: 'Юкасса',
		STRIPE: 'Stripe',
		CRYPTOPAY: 'Crypto Pay'
	}

	const handleExport = () => {
		if (!payments) return

		const data = payments.map(payment => ({
			ID: payment.id,
			Дата: formatDate(payment.createdAt),
			Сумма: `${payment.amount} ₽`,
			Провайдер: providerNames[payment.provider],
			Статус: payment.status
		}))

		const worksheet = xlsx.utils.json_to_sheet(data)

		worksheet['!cols'] = [
			{ wch: 25 },
			{ wch: 12 },
			{ wch: 6 },
			{ wch: 12 },
			{ wch: 12 }
		]

		const workbook = xlsx.utils.book_new()
		xlsx.utils.book_append_sheet(workbook, worksheet, 'История платежей')

		const buffer = xlsx.write(workbook, {
			bookType: 'xlsx',
			type: 'array'
		})

		const blob = new Blob([buffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		})

		const link = document.createElement('a')

		link.href = URL.createObjectURL(blob)
		link.setAttribute('download', 'payment-history.xlsx')
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	if (isLoading) return <PaymentHistorySkeleton />

	return (
		<Card className='border-0 shadow-xs'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-lg font-semibold'>
						История платежей
					</CardTitle>
					{payments?.length !== 0 && (
						<Button
							onClick={handleExport}
							variant='outline'
							size='sm'
							className='rounded-lg border-2 border-gray-300 font-medium hover:bg-gray-50'
						>
							<Download className='mr-2 h-4 w-4' />
							Экспорт
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-gray-200'>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									ID
								</th>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									Дата
								</th>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									Сумма
								</th>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									Способ оплаты
								</th>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									Статус
								</th>
							</tr>
						</thead>
						<tbody>
							{payments?.map((payment, index) => (
								<tr
									key={index}
									className='border-b border-gray-100 hover:bg-gray-50'
								>
									<td className='px-2 py-4 font-mono text-xs text-gray-500'>
										{payment.id}
									</td>
									<td className='px-2 py-4 text-sm'>
										{formatDate(payment.createdAt)}
									</td>
									<td className='px-2 py-4 text-sm font-semibold'>
										{payment.amount}₽
									</td>
									<td className='text-muted-foreground px-2 py-4 text-sm'>
										{providerNames[payment.provider]}
									</td>
									<td className='px-2 py-4'>
										<PaymentStatusBadge
											status={payment.status}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{payments?.length === 0 && (
					<div className='py-12 text-center'>
						<CreditCard className='mx-auto mb-4 h-12 w-12 text-gray-300' />
						<h3 className='mb-2 text-lg font-semibold'>
							Нет истории платежей
						</h3>
						<p className='text-gray-600'>
							Ваши платежи будут отображаться здесь
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

function PaymentHistorySkeleton() {
	return (
		<Card className='border-0 shadow-sm'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-lg font-semibold'>
						История платежей
					</CardTitle>
					<Skeleton className='h-8 w-20 rounded-lg' />
				</div>
			</CardHeader>
			<CardContent>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-gray-200'>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									ID
								</th>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									Дата
								</th>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									Сумма
								</th>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									Способ оплаты
								</th>
								<th className='px-2 py-3 text-left text-sm font-semibold'>
									Статус
								</th>
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 8 }).map((_, index) => (
								<tr
									key={index}
									className='border-b border-gray-100'
								>
									<td>
										<Skeleton className='h-4 w-16' />
									</td>
									<td>
										<Skeleton className='h-4 w-20' />
									</td>
									<td>
										<Skeleton className='h-4 w-16' />
									</td>
									<td>
										<Skeleton className='h-4 w-14' />
									</td>
									<td>
										<Skeleton className='h-5 w-16 rounded-full' />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	)
}
