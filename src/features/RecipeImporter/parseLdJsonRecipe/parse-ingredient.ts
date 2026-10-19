import { extractLeadingQuantity } from './extract-leading-quantity';
import { extractLeadingUnit } from './extract-leading-unit';

/**
 * Reference: https://unicode.org/reports/tr15/#Norm_Forms
 * Example: ¼ -> 1/4
 */
const normalizeUnicode = (input: string) =>
	input.normalize('NFKD').replace('⁄', '/');

export const parseIngredient = (input: string) => {
	const normalized = normalizeUnicode(input);
	const { quantity, postQuantity } = extractLeadingQuantity(normalized);
	const { unit, name } = extractLeadingUnit(postQuantity.toLocaleLowerCase());
	return { quantity, unit, name };
};
