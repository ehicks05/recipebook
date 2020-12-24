import Fraction from 'fraction.js';

const validateQuantity = (quantity: string | undefined) => {
  let isValid = false;
  try {
    console.log(
      `fraction.js says ${quantity} is ${quantity && new Fraction(quantity)}`,
    );
    isValid = true;
  } catch (e) {
    // noop
  }
  return isValid;
};

export { validateQuantity };
