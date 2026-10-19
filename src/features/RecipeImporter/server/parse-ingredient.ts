import { extractLeadingQuantity } from './extract-leading-quantity';

/**
 * Reference: https://unicode.org/reports/tr15/#Norm_Forms
 * Example: ¼ -> 1/4
 */
const normalizeUnicode = (input: string) =>
	input.normalize('NFKD').replace('⁄', '/');

const RAW_TO_SUPPORTED_UNITS = {
	tsp: 'tsp',
	teaspoon: 'tsp',
	tbsp: 'tbsp',
	tablespoon: 'tbsp',
	oz: 'oz',
	ounce: 'oz',
	cup: 'cup',
	// pt: 'pt',
	// pint: 'pt',
	// qt: 'qt',
	// quart: 'qt',
	// gal: 'gal',
	// gallon: 'gal',
	lb: 'lb',
	pound: 'lb',
	g: 'g',
	gram: 'g',
	ml: 'ml',
	milliliter: 'ml',
	l: 'L',
	liter: 'L',
} as const;

const extractLeadingUnit = (input: string) => {
	const firstWord = input.slice(0, input.indexOf(' '));
	const rest = input.slice(input.indexOf(' ') + 1);

	const matchedUnit = Object.entries(RAW_TO_SUPPORTED_UNITS).find(([rawUnit]) =>
		[`${rawUnit}`, `${rawUnit}s`, `${rawUnit}es`].includes(firstWord),
	);
	if (matchedUnit) {
		const [_, canonicalUnit] = matchedUnit;
		return { unit: canonicalUnit, name: rest };
	}
	return { unit: undefined, name: input };
};

export const parseIngredient = (input: string) => {
	const normalized = normalizeUnicode(input);
	const { quantity, postQuantity } = extractLeadingQuantity(normalized);
	const { unit, name } = extractLeadingUnit(postQuantity.toLocaleLowerCase());
	return { quantity, unit, name };
};
