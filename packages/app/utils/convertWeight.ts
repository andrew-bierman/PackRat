type WeightUnit = 'g' | 'kg' | 'oz' | 'lb' | 'lbs';

/**
 * Converts a weight from one unit to another.
 *
 * @param {number} weight - The weight to be converted.
 * @param {WeightUnit} fromUnit - The unit the weight is currently in.
 * @param {WeightUnit} toUnit - The unit to convert the weight to.
 * @return {number} The converted weight.
 */
export const convertWeight = (
  weight: number,
  fromUnit: WeightUnit,
  toUnit: WeightUnit,
): number => {
  if (typeof weight !== 'number' || !fromUnit || !toUnit) {
    return 0; // return 0 if weight is not a number or any of the units are missing
  }

  const units: Record<WeightUnit, number> = {
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
    lbs: 453.592,
  };

  const weightInGrams = weight * units[fromUnit];
  const convertedWeight = weightInGrams / units[toUnit];

  return Number(convertedWeight.toFixed(2));
};
