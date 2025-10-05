'use client'

import { CheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { type PlansResponse } from '@/api/types'

import { cn } from '@/lib/utils'

import { LayoutIconOne } from '../icons/layout-icon-one'
import { LayoutIconThree } from '../icons/layout-icon-three'
import { LayoutIconTwo } from '../icons/layout-icon-two'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Switch } from '../ui/switch'

export const icons = {
	Начальный: <LayoutIconOne className='size-9' />,
	Премиум: <LayoutIconTwo className='size-9' />,
	Ультра: <LayoutIconThree className='size-9' />
}

interface PricingSectionProps {
	plans: PlansResponse[]
}

export function PricingSection({ plans }: PricingSectionProps) {
	const router = useRouter()

	const [isYearly, setIsYearly] = useState(false)

	const calculateYearlyDiscount = (
		monthlyPrice: number,
		yearlyPrice: number
	) => {
		const yearlyMonthly = yearlyPrice / 12

		const discount = ((monthlyPrice - yearlyMonthly) / monthlyPrice) * 100

		return Math.round(discount)
	}

	return (
		<>
			<section className='px-6 pb-20'>
				<div className='mx-auto max-w-7xl'>
					<div className='mb-12 flex justify-center'>
						<div className='flex flex-col items-center gap-4'>
							<div className='flex items-center gap-3 px-4 py-2'>
								<span
									className={cn(
										'text-sm font-medium transition-colors',
										isYearly
											? 'text-muted-foreground'
											: 'text-foreground'
									)}
								>
									Месячный
								</span>

								<Switch
									checked={isYearly}
									onCheckedChange={setIsYearly}
								/>

								<span
									className={cn(
										'text-sm font-medium transition-colors',
										isYearly
											? 'text-foreground'
											: 'text-muted-foreground'
									)}
								>
									Годовой
								</span>
							</div>

							{isYearly && (
								<div className='text-background rounded-lg bg-lime-500 px-3 py-1 text-xs font-medium'>
									Экономия 20%
								</div>
							)}
						</div>
					</div>

					<div className='grid gap-8 md:grid-cols-3'>
						{plans.map((plan, index) => {
							const displayPrice = isYearly
								? Math.round(plan.yearlyPrice / 12)
								: plan.monthlyPrice

							return (
								<Card
									key={index}
									className={cn(
										'from-foreground/5 to-background/95 relative rounded-3xl bg-gradient-to-b p-8 shadow-lg backdrop-blur-sm',
										plan.isPopular &&
											'transform shadow-xl ring-1 ring-lime-500'
									)}
								>
									<div className='mb-6'>
										<div className='mb-4 flex size-12 items-center justify-center rounded-2xl border border-lime-500 bg-lime-500 text-3xl shadow-md'>
											{
												icons[
													plan.title as keyof typeof icons
												]
											}
										</div>

										<h3 className='text-foreground mb-2 text-2xl font-bold'>
											{plan.title}
										</h3>

										<p className='text-muted-foreground mb-6 text-sm'>
											{plan.description}
										</p>

										<div className='mb-6'>
											<div className='flex items-baseline gap-1'>
												<span className='text-foreground text-4xl font-bold'>
													{displayPrice}&#8381;
												</span>
												<span className='text-muted-foreground'>
													/ в месяц
												</span>
											</div>

											{isYearly ? (
												<div className='text-muted-foreground mt-1 text-sm'>
													{plan.yearlyPrice}&#8381; в
													год - экономия{' '}
													{calculateYearlyDiscount(
														plan.monthlyPrice,
														plan.yearlyPrice
													)}
													%
												</div>
											) : (
												<div className='text-muted-foreground mt-1 text-sm'>
													Отменяйте в любой момент
												</div>
											)}
										</div>

										<Button size='lg' className='w-full'>
											Продолжить
										</Button>
									</div>

									<div className='space-y-4'>
										<h4 className='text-foreground mb-4 font-semibold'>
											В тарифный план входит:
										</h4>

										{plan.features.map((feature, index) => (
											<div
												key={index}
												className='flex items-start gap-x-3'
											>
												<div className='flex size-5 items-center justify-center rounded-full bg-lime-500'>
													<CheckIcon className='text-background size-3' />
												</div>
												<span className='text-muted-foreground text-sm'>
													{feature}
												</span>
											</div>
										))}
									</div>
								</Card>
							)
						})}
					</div>
				</div>
			</section>
		</>
	)
}
