// Conversion factors
const conversionFactors = {
  grams: {
    kilograms: 0.001,
    ounces: 0.035274,
    pounds: 0.00220462,
  },
  kilograms: {
    grams: 1000,
    ounces: 35.274,
    pounds: 2.20462,
  },
  ounces: {
    grams: 28.3495,
    kilograms: 0.0283495,
    pounds: 0.0625,
  },
  pounds: {
    grams: 453.592,
    kilograms: 0.453592,
    ounces: 16,
  },
};

// Controller function for weight conversion
export const convertWeight = (req, res) => {
  const { sourceUnit, targetUnit, weight } = req.body;

  // Check if the conversion factor exists
  if (
    !conversionFactors[sourceUnit] ||
    !conversionFactors[sourceUnit][targetUnit]
  ) {
    return res.status(400).json({ message: "Invalid conversion units" });
  }

  // Perform the conversion
  const conversionFactor = conversionFactors[sourceUnit][targetUnit];
  const convertedWeight = weight * conversionFactor;

  res.json({ convertedWeight, unit: targetUnit });
};
