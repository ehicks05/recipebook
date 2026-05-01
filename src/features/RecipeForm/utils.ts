import Fraction from 'fraction.js';

const validateQuantity = (quantity: unknown | undefined) => {
	if (!quantity) return false;
	try {
		new Fraction(quantity as string);
		return true;
	} catch (_e) {
		return false;
	}
};

export { validateQuantity };
