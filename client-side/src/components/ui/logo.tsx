import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
	return (
		<>
			<Link href='/'>
				<Image
					src='/images/logo-dark.svg'
					alt='Темный логотип'
					className='dark:hidden'
					width={150}
					height={150}
				/>
				<Image
					src='/images/logo-white.svg'
					alt='Светлый логотип'
					className='hidden dark:block'
					width={150}
					height={150}
				/>
			</Link>
		</>
	)
}
