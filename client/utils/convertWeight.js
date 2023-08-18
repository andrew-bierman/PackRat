export const convertWeight = (weight, fromUnit, toUnit) => {
  if (typeof weight !== "number" || !fromUnit || !toUnit) {
    return 0; // return 0 if weight is not a number or any of the units are missing
  }

  const units = {
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
  };

  const weightInGrams = weight * units[fromUnit];
  const convertedWeight = weightInGrams / units[toUnit];

  return convertedWeight;
};
