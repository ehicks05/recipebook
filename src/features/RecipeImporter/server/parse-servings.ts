import { extractLeadingQuantity } from './extract-leading-quantity';

export const parseServings = (input: string) => {
	const { quantity } = extractLeadingQuantity(input);
	return Number(quantity) || 1;
};
