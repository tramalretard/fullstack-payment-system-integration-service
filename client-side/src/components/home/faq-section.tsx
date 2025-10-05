'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { faqs } from '@/data'

export function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	return (
		<section className='py-20'>
			<div className='mx-auto max-w-6xl'>
				<div className='mb-12 text-center'>
					<h2 className='text-foreground mb-4 text-3xl font-bold'>
						Часто задаваемые вопросы
					</h2>
				</div>

				<div className='space-y-4'>
					{faqs.map((faq, index) => (
						<div
							key={index}
							className='bg-background/20 rounded-2xl shadow-sm'
						>
							<button
								onClick={() =>
									setOpenIndex(
										openIndex === index ? null : index
									)
								}
								className='hover:bg-foreground/10 flex w-full cursor-pointer items-center justify-between rounded-2xl px-8 py-6 text-left transition-colors'
							>
								<span className='text-foreground font-semibold tracking-wide'>
									{faq.question}
								</span>
								<ChevronDownIcon
									className={cn(
										'text-muted-background size-5',
										openIndex === index && 'rotate-180'
									)}
								/>
							</button>

							{openIndex === index && (
								<div className='px-8 pt-4 pb-6'>
									<p className='text-foreground/70'>
										{faq.answer}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
