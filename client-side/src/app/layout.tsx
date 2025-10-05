import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { ButtonTheme } from '@/components/ui/button-theme'

import './globals.css'
import { QueryProvider } from '@/providers/query-client-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const montserrat = Montserrat({
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Payment Systems',
	description: ''
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${montserrat.className} antialiased`}>
				<QueryProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<ButtonTheme className='fixed right-5 bottom-5 z-50' />
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
