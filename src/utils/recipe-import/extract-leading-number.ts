/**
 * Traverse the input until finding a character that doesn't belong to a number.
 * Split the input and return the result.
 */
export const extractLeadingNumber = (_input: string) => {
	const input = _input.trim();
	let endIndex = 0;
	while (
		'0123456789.,/'.includes(input.charAt(endIndex)) &&
		endIndex <= input.length - 1
	) {
		endIndex += 1;
	}
	return {
		number: input.slice(0, endIndex).trim(),
		rest: input.slice(endIndex).trim(),
	};
};
