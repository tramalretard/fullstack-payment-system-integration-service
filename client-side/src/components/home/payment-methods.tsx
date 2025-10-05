import { Control } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { FormControl, FormField, FormItem } from '../ui/form'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

import { InitPaymentFormValues } from './payment-modal'
import { paymentMethods } from '@/data'

interface PaymentMethodsProps {
	control: Control<InitPaymentFormValues>
}

export function PaymentMethods({ control }: PaymentMethodsProps) {
	return (
		<FormField
			control={control}
			name='provider'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							value={field.value}
							className='flex flex-col space-y-2'
						>
							{paymentMethods.map((method, index) => {
								const isSelected =
									String(field.value) === method.id

								return (
									<FormItem key={index}>
										<FormControl>
											<RadioGroupItem
												value={method.id}
												id={method.id}
												className='sr-only'
											/>
										</FormControl>

										<Label
											htmlFor={method.id}
											className={cn(
												'cursor-pointer gap-4 rounded-xl border-2 p-4 transition-all duration-200',
												isSelected
													? 'border-lime-600 bg-lime-500'
													: 'bg-background border-foreground/20 hover:border-foreground/40'
											)}
										>
											<div
												className={cn(
													'flex size-10 items-center justify-center rounded-lg',
													isSelected
														? 'bg-lime-600'
														: method.bg
												)}
											>
												<method.icon
													className={cn(
														'size-5',
														isSelected
															? 'text-background'
															: method.textColor
													)}
												/>
											</div>

											<div className='flex-1'>
												<h3
													className={cn(
														'font-semibold',
														isSelected
															? 'text-background'
															: 'text-foreground'
													)}
												>
													{method.name}
												</h3>
												<p
													className={cn(
														'mt-1 text-sm',
														isSelected
															? 'text-lime-700'
															: 'text-muted-foreground'
													)}
												>
													{method.description}
												</p>
											</div>
										</Label>
									</FormItem>
								)
							})}
						</RadioGroup>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
