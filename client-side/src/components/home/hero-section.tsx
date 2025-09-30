export function HeroSection() {
	return (
		<section className='px-6 py-16 text-center'>
			<div className='mx-auto max-w-4xl'>
				<h1 className='mb-6 text-5xl leading-[70px] font-bold md:text-6xl'>
					Гибкие тарифные планы
					<br />
					для любых задач
				</h1>

				<p className='text-muted-foreground mx-auto mb-10 max-w-2xl text-xl'>
					Подберите тариф, который подойдёт именно Вам
				</p>

				<div className='flex items-center justify-center'>
					<div className='flex items-center space-x-2 rounded-full border px-4 py-1 text-sm'>
						<div className='size-2 rounded-full bg-lime-500' />
						<span>Популярный тарифный план</span>
					</div>
				</div>
			</div>
		</section>
	)
}
