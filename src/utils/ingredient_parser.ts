/**
 * Reference: https://unicode.org/reports/tr15/#Norm_Forms
 * Example: ¼ -> 1/4
 */
const normalizeUnicode = (input: string) =>
  input.normalize("NFKD").replace("⁄", "/");

export const extractLeadingQuantity = (input: string) => {
  let endIndex = 0;
  while (
    "0123456789.,/ ".includes(input.charAt(endIndex)) &&
    endIndex <= input.length - 1
  ) {
    endIndex += 1;
  }
  return {
    quantity: input.slice(0, endIndex).trim(),
    rest: input.slice(endIndex).trim(),
  };
};

const rawUnitsToSupportedUnits = {
  tsp: "tsp",
  teaspoon: "tsp",
  tbsp: "tbsp",
  tablespoon: "tbsp",
  oz: "oz",
  ounce: "oz",
  cup: "cup",
  // pt: 'pt',
  // pint: 'pt',
  // qt: 'qt',
  // quart: 'qt',
  // gal: 'gal',
  // gallon: 'gal',
  lb: "lb",
  pound: "lb",
  g: "g",
  gram: "g",
  ml: "ml",
  milliliter: "ml",
  l: "L",
  liter: "L",
} as const;

const extractLeadingUnit = (input: string) => {
  const matchedUnit = Object.entries(rawUnitsToSupportedUnits).find(
    ([rawUnit]) =>
      input.startsWith(`${rawUnit}`) ||
      input.startsWith(`${rawUnit}s`) ||
      input.startsWith(`${rawUnit}es`)
  );
  if (matchedUnit) {
    const [rawUnit, supportedUnit] = matchedUnit;
    const pluralCharacters = input.startsWith(`${rawUnit}es`)
      ? 2
      : input.startsWith(`${rawUnit}s`)
      ? 1
      : 0;
    const name = input
      .substring(matchedUnit[0].length + pluralCharacters)
      .trim();
    return { unit: supportedUnit, name };
  }
  return {
    unit: null,
    name: input,
  };
};

export const parseIngredient = (input: string) => {
  const normalized = normalizeUnicode(input);
  const { quantity, rest: postQuantity } = extractLeadingQuantity(normalized);
  const { unit, name } = extractLeadingUnit(postQuantity.toLocaleLowerCase());
  return { quantity, unit, name };
};
