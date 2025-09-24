'use client'

import { useQuery } from '@tanstack/react-query'

import { getMe } from '@/api/requests'

export default function DashboardPage() {
	const { data, isLoading } = useQuery({
		queryKey: ['getMe'],
		queryFn: getMe
	})

	return <div>{isLoading ? 'Loading...' : JSON.stringify(data)}</div>
}
