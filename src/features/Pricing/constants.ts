export interface Tier {
	name: string;
	id: string;
	href: string;
	priceMonthly: string;
	description: string;
	features: string[];
	featured: boolean;
}

export const PRICING_TIERS: Tier[] = [
	{
		name: 'Solo',
		id: 'tier-solo',
		href: '#',
		priceMonthly: '$1.99',
		description: 'Recipes for the solo chef.',
		features: ['1 user account', 'Save up to 10 recipes'],
		featured: false,
	},
	{
		name: 'Small Family',
		id: 'tier-small-family',
		href: '#',
		priceMonthly: '$3.99',
		description: 'Recipes for a small family.',
		features: [
			'Up to 2 family members',
			'Up to 50 recipes',
			'Up to 50 ai recipe images',
		],
		featured: true,
	},
	{
		name: 'Large Family',
		id: 'tier-large-family',
		href: '#',
		priceMonthly: '$5.99',
		description: 'Recipes for a large family.',
		features: [
			'Up to 5 family members',
			'Up to 100 recipes',
			'Up to 100 ai recipe images',
		],
		featured: false,
	},
];
