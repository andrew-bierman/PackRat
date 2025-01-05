export type WeightUnit = 'g' | 'kg' | 'oz' | 'lb' | 'lbs';

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
