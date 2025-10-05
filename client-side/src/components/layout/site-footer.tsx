import Image from 'next/image'
import Link from 'next/link'

import { companyLinks, productLinks, supportLinks } from '@/data'

export function SiteFooter() {
	return (
		<footer className='text-background bg-black/90 py-16'>
			<div className='mx-auto max-w-7xl'>
				<div className='grid gap-8 md:grid-cols-4'>
					<div>
						<div className='mb-2 flex items-center gap-x-2'>
							<Image
								src={'/images/logos/logo-white.svg'}
								alt='logo'
								width={30}
								height={30}
							/>
							<span className='text-background text-xl font-semibold'>
								Utome
							</span>
						</div>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>Продукт</h3>

						<ul className='text-muted-foreground space-y-2'>
							{productLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className='transition-colors hover:text-lime-500'
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>О компании</h3>

						<ul className='text-muted-foreground space-y-2'>
							{companyLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className='transition-colors hover:text-lime-500'
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='mb-4 font-semibold'>Поддержка</h3>

						<ul className='text-muted-foreground space-y-2'>
							{supportLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className='transition-colors hover:text-lime-500'
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}
