import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import './globals.css'
import { QueryProvider } from '@/providers/query-client-provider'

const montserrat = Montserrat({
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Utome',
	description: 'Utome - tariff plans for everyone'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${montserrat.className} antialiased`}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
