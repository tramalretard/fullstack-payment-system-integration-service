import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
	width: number
	height: number
}

export function Logo({ width, height }: LogoProps) {
	return (
		<>
			<Link href='/'>
				<Image
					src='/images/logo-dark.svg'
					alt='Темный логотип'
					className='dark:hidden'
					width={width}
					height={height}
				/>
				<Image
					src='/images/logo-white.svg'
					alt='Светлый логотип'
					className='hidden dark:block'
					width={width}
					height={height}
				/>
			</Link>
		</>
	)
}
