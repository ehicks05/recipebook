import { TierCard } from './TierCard';
import { PRICING_TIERS } from './constants';

const Hero = () => {
	return (
		<>
			<div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
				/>
			</div>
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
				<p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
					Choose the right plan for you
				</p>
			</div>
			<p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
				Choose an affordable plan that’s packed with the best features for engaging
				your audience, creating customer loyalty, and driving sales.
			</p>
		</>
	);
};

export default function Example() {
	return (
		<div className="relative isolate bg-white h-full px-6 py-24 sm:py-32 lg:px-8">
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
