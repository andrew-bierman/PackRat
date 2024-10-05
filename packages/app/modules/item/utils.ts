import { type ItemUnit } from './model';

export const convertWeighToSmallestUnit = (unit: ItemUnit, weight: number) => {
  const conversionRates = {
    lb: 453.592,
    oz: 28.3495,
    kg: 1000,
    g: 1,
  };

  if (!conversionRates[unit]) {
    return 'Not Available';
  }

  const convertedWeight = weight * conversionRates[unit];

  return parseFloat(convertedWeight.toFixed(2));
};
