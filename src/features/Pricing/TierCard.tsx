import clsx from 'clsx';
import { HiCheck } from 'react-icons/hi';
import type { Tier } from './constants';

export const TierCard = ({
	tier,
	isFirst,
	isLast,
}: { tier: Tier; isFirst: boolean; isLast: boolean }) => {
	return (
		<div
			key={tier.id}
			className={clsx(
				tier.featured
					? 'relative bg-gray-900 shadow-2xl'
					: 'bg-white/60 sm:mx-8 lg:mx-0',
				tier.featured
					? 'sm:py-16'
					: isFirst
						? 'rounded-t-3xl sm:rounded-b-none lg:rounded-l-3xl lg:rounded-r-none'
						: isLast
							? 'rounded-b-3xl sm:rounded-t-none lg:rounded-r-3xl lg:rounded-l-none'
							: 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
				'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
			)}
		>
			<h3
				id={tier.id}
				className={clsx(
					tier.featured ? 'text-indigo-400' : 'text-indigo-600',
					'text-base/7 font-semibold',
				)}
			>
				{tier.name}
			</h3>
			<p className="mt-4 flex items-baseline gap-x-2">
				<span
					className={clsx(
						tier.featured ? 'text-white' : 'text-gray-900',
						'text-5xl font-semibold tracking-tight',
					)}
				>
					{tier.priceMonthly}
				</span>
				<span
					className={clsx(
						tier.featured ? 'text-gray-400' : 'text-gray-500',
						'text-base',
					)}
				>
					/month
				</span>
			</p>
			<p
				className={clsx(
					tier.featured ? 'text-gray-300' : 'text-gray-600',
					'mt-6 text-base/7',
				)}
			>
				{tier.description}
			</p>
			<ul
				className={clsx(
					tier.featured ? 'text-gray-300' : 'text-gray-600',
					'mt-8 space-y-3 text-sm/6 sm:mt-10',
				)}
			>
				{tier.features.map((feature) => (
					<li key={feature} className="flex gap-x-3">
						<HiCheck
							className={clsx(
								tier.featured ? 'text-indigo-400' : 'text-indigo-600',
								'h-6 w-5 flex-none',
							)}
						/>
						{feature}
					</li>
				))}
			</ul>
			<a
				href={tier.href}
				className={clsx(
					tier.featured
						? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
						: 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
					'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
				)}
			>
				Get started today
			</a>
		</div>
	);
};
