export const convertWeight = (weight, fromUnit, toUnit) => {
  const units = {
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
  };

  const weightInGrams = weight * units[fromUnit];
  const convertedWeight = weightInGrams / units[toUnit];
  // console.log(weight, fromUnit, toUnit, weightInGrams, convertedWeight);

  return convertedWeight;
};
