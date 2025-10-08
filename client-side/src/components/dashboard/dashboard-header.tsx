'use client'

import { UserIcon } from 'lucide-react'

import { useGetMeQuery } from '@/api/hooks'

export function DashboardHeader() {
	const { data: user, isLoading } = useGetMeQuery()

	return (
		<header className='flex items-center justify-between'>
			<div>
				<h1 className='text-3xl font-bold'>Личный кабинет</h1>
				<p className='text-muted-foreground mt-1'>
					Управляйте своей подпиской и платежами
				</p>
			</div>

			<div className='flex items-center gap-3'>
				<div className='flex size-10 items-center justify-center rounded-full bg-lime-600'>
					<UserIcon className='size-5 text-white' />
				</div>

				<div>
					{isLoading ? (
						'Загрузка...'
					) : (
						<>
							<p className='font-medium'>{user?.name}</p>
							<p className='text-muted-foreground text-sm'>
								{user?.email}
							</p>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
