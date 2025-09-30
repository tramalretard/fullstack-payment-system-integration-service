import Link from 'next/link'
import type { ReactNode } from 'react'

import { Logo } from '../ui/logo'

interface AuthWrapperProps {
	title: string
	description: string
	bottomText?: string
	bottomTextLink?: string
	bottomLinkHref?: string
	children: ReactNode
}

export function AuthWrapper({
	title,
	description,
	bottomText,
	bottomTextLink,
	bottomLinkHref,
	children
}: AuthWrapperProps) {
	return (
		<div className='flex min-h-screen'>
			<div className='from-background/20 to-foreground/20 relative hidden overflow-hidden bg-gradient-to-l lg:flex lg:w-1/2'>
				<div className='position-absolute from-background/90 to-foreground/90 inset-0 bg-gradient-to-br' />
				<div className='relative z-10 flex h-full w-full flex-col items-center justify-center p-12'>
					<Logo width={200} height={200} />
				</div>
			</div>
			<div className='flex w-full items-center justify-center p-8 lg:w-1/2'>
				<div className='mx-auto w-full max-w-md'>
					<div className='text-center lg:text-left'>
						<h1 className='text-center text-3xl font-bold'>
							{title}
						</h1>
						<p className='pt-2 text-center'>{description}</p>
					</div>
					<div className='my-4'>{children}</div>

					{bottomText && bottomTextLink && bottomLinkHref && (
						<p className='text-center'>
							{bottomText}{' '}
							<Link
								href={bottomLinkHref}
								className='font-medium hover:underline'
							>
								{bottomTextLink}
							</Link>
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
