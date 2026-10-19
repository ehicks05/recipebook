/**
 * Traverse the input until finding a character that doesn't belong to a number.
 * Split the input and return the result.
 */
export const extractLeadingQuantity = (_input: string) => {
	const input = _input.trim();
	let endIndex = 0;
	while (
		'0123456789.,/- '.includes(input.charAt(endIndex)) &&
		endIndex <= input.length - 1
	) {
		endIndex += 1;
	}

	const possibleNumber = input.slice(0, endIndex).trim();
	const quantity = possibleNumber.includes('-')
		? possibleNumber.split('-')[0] // handle situations like 3-4 cloves
		: possibleNumber;

	return {
		quantity,
		postQuantity: input.slice(endIndex).trim(),
	};
};
