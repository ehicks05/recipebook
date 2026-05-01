import { PRICING_TIERS } from './constants';
import { TierCard } from './TierCard';

const Hero = () => {
	return (
		<>
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-base/7 font-semibold text-indigo-400">Pricing</h2>
				<p className="mt-2 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
					Choose the right plan for you
				</p>
			</div>
			<p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-muted-foreground sm:text-xl/8">
				Choose an affordable plan that’s packed with the best features for engaging
				your audience, creating customer loyalty, and driving sales.
			</p>
		</>
	);
};

export function Pricing() {
	return (
		<div className="relative isolate h-full px-6 py-24 sm:py-32 lg:px-8">
			<Hero />
			<div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
				{PRICING_TIERS.map((tier, index) => (
					<TierCard
						key={tier.name}
						tier={tier}
						isFirst={index === 0}
						isLast={index === PRICING_TIERS.length - 1}
					/>
				))}
			</div>
		</div>
	);
}
