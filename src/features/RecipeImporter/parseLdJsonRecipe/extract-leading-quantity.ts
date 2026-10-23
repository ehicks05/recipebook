const isSimpleNumber = (input: string) => input.match(/^\d+$/);
const isSimpleFraction = (input: string) => input.match(/^\d+\/\d+$/);
const isSimpleRange = (input: string) => input.match(/^\d+\s*-\s*\d+$/);

const isValidNumber = (input: string) => !Number.isNaN(Number(input));

const average = (input: string) => {
	const parts = input.split('-').map(Number);
	return (parts[0] + parts[1]) / 2;
};

/**
 * Split input into words. Check against each possible case:
 * 1. mixed number (1 1/2)
 * 2. simple fraction (3/4)
 * 3. simple range (1-2)
 * 4. Finally check the basic case of word[0] being a valid number.
 */
export const extractLeadingQuantity = (input: string) => {
	const words = input
		.trim()
		.split(' ')
		.map((o) => o.trim());

	const wordsWithoutCommas = words.map((o) => o.replaceAll(',', ''));

	if (words.length <= 1) {
		return { quantity: 0, postQuantity: input };
	}

	// check two word solutions first
	// mixed number
	if (
		isSimpleNumber(wordsWithoutCommas[0]) &&
		isSimpleFraction(wordsWithoutCommas[1])
	) {
		return {
			quantity: wordsWithoutCommas.slice(0, 2).join(' '),
			postQuantity: words.slice(2).join(' '),
		};
	}

	// simple fraction
	if (isSimpleFraction(wordsWithoutCommas[0])) {
		return {
			quantity: wordsWithoutCommas[0],
			postQuantity: words.slice(1).join(' '),
		};
	}

	// simple range
	// NOTE: '1 - 2 leeks' will not be averaged
	if (isSimpleRange(wordsWithoutCommas[0])) {
		return {
			quantity: average(wordsWithoutCommas[0]),
			postQuantity: words.slice(1).join(' '),
		};
	}

	// parseable as a number
	if (isValidNumber(wordsWithoutCommas[0])) {
		return {
			quantity: wordsWithoutCommas[0],
			postQuantity: words.slice(1).join(' '),
		};
	}

	return { quantity: 0, postQuantity: input };
};

// const TEST_CASES = [
// 	'1',
// 	'  1',
// 	'1  ',
// 	'12',
// 	'12,000',
// 	'0.5',
// 	'.5',
// 	'1.5 2',
// 	'2 1.5',
// 	'2.2.2',
// 	'1/2',
// 	'3 1/2',
// 	'3-4', // a range
// 	'3 - 4', // a range
// 	'10 4',
// 	'10 3-4"',
// 	'1 28-oz',
// ].map((o) => `${o} leek`);

// TEST_CASES.forEach((testCase) => {
// 	console.log(
// 		`'${testCase.padStart(12)}': ${extractLeadingQuantity(testCase).quantity}`,
// 	);
// });
