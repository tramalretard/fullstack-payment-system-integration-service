import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
	{
		variants: {
			variant: {
				default: 'bg-blue-50 text-blue-900 ring-blue-500/30',
				neutral: 'bg-gray-50 text-gray-900 ring-gray-500/30',
				success: 'bg-emerald-50 text-emerald-900 ring-emerald-500/30',
				error: 'bg-red-50 text-red-900 ring-red-500/30',
				warning: 'bg-yellow-50 text-yellow-900 ring-yellow-500/30'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span'

	return (
		<Comp
			data-slot='badge'
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
