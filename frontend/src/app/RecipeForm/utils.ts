import Fraction from 'fraction.js';

const validateQuantity = (quantity: string | undefined) => {
  if (!quantity) return false;
  try {
    // eslint-disable-next-line no-new
    new Fraction(quantity);
    return true;
  } catch (e) {
    // noop
  }
  return false;
};

export { validateQuantity };
