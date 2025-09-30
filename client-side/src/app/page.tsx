import { getAllPlans } from '@/api/requests'

import { HeroSection } from '@/components/home/hero-section'
import { PricingSection } from '@/components/home/pricing-section'
import { SiteHeader } from '@/components/layout/site-header'

export const revalidate = 60

export default async function Home() {
	const plans = await getAllPlans()

	return (
		<div className='from-foreground/10 to-background/10 min-h-screen bg-gradient-to-t'>
			<SiteHeader />
			<HeroSection />
			<PricingSection plans={plans} />
		</div>
	)
}
