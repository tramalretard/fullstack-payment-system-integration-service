import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface SubscriptionCardProps {
	icon?: LucideIcon
	iconBg?: string
	iconColor?: string
	title?: string
	description?: ReactNode
	children?: ReactNode
	action?: ReactNode
}

export function SubscriptionCard({
	icon: Icon,
	iconBg,
	iconColor,
	title,
	description,
	children,
	action
}: SubscriptionCardProps) {
	return (
		<Card className='gap-0 border-0 shadow-xs'>
			<CardHeader>
				<CardTitle className='text-lg'>Подписка</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='text-center'>
					{Icon && (
						<div
							className={cn(
								'mx-auto mb-4 flex size-16 items-center justify-center rounded-full',
								iconBg
							)}
						>
							<Icon className={cn('size-8', iconColor)} />
						</div>
					)}
					{title && (
						<h3 className='mb-2 text-lg font-semibold'>{title}</h3>
					)}
					{description && (
						<p className='text-muted-foreground mb-6 text-sm'>
							{description}
						</p>
					)}
				</div>
				{children}
				{action}
			</CardContent>
		</Card>
	)
}
