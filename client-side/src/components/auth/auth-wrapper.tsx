import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

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
			<div className='flex w-full items-center justify-center p-8'>
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
