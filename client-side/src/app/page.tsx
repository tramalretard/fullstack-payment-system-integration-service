import { getAllPlans } from '@/api/requests'

import { FAQSection } from '@/components/home/faq-section'
import { HeroSection } from '@/components/home/hero-section'
import { PricingSection } from '@/components/home/pricing-section'
import { TrustedBySection } from '@/components/home/trusted-by-section'
import { SiteHeader } from '@/components/layout/site-header'

export const revalidate = 60

export default async function Home() {
	const plans = await getAllPlans()

	return (
		<div className='from-foreground/40 to-background/40 min-h-screen bg-gradient-to-t'>
			<SiteHeader />
			<HeroSection />
			<PricingSection plans={plans} />
			<TrustedBySection />
			<FAQSection />
		</div>
	)
}
