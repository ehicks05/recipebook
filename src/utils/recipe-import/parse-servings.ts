import { extractLeadingNumber } from './extract-leading-number';

export const parseServings = (input: string) => {
	const { number } = extractLeadingNumber(input);
	return Number(number) || 1;
};
