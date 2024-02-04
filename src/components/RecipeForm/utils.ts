import Fraction from 'fraction.js';

const validateQuantity = (quantity: unknown | undefined) => {
	if (!quantity) return false;
	try {
		// eslint-disable-next-line no-new
		new Fraction(quantity as string);
		return true;
	} catch (e) {
		// noop
	}
	return false;
};

export { validateQuantity };
