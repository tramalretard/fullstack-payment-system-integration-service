'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

interface ProvidersProps {
	children: ReactNode
}

export function QueryProvider({ children }: ProvidersProps) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
