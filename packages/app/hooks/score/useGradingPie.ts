export const useGradingPie = (scores) => {
  const { weightScore, essentialItemsScore, redundancyAndVersatilityScore } =
    scores;
  const radius = 80;
  const circleCircumference = 2 * Math.PI * radius;

  const total =
    weightScore + essentialItemsScore + redundancyAndVersatilityScore;

  const weightFraction = weightScore / total;
  const essentialItemsFraction = essentialItemsScore / total;
  const redundancyAndVersatilityFraction =
    redundancyAndVersatilityScore / total;

  const weightPath = weightFraction * circleCircumference - 15;
  const essentialItemsPath = essentialItemsFraction * circleCircumference - 15;
  const redundancyAndVersatilityPath =
    redundancyAndVersatilityFraction * circleCircumference - 15;

  const weightStrokeDashoffset = 0.25 * circleCircumference - 7;
  const essentailItemsStrokeDashoffset =
    (-weightFraction + 0.25) * circleCircumference - 7;
  const redundancyAndVersatilityStrokeDashoffset =
    -(weightFraction + essentialItemsFraction - 0.25) * circleCircumference - 7;

  return {
    radius,
    circleCircumference,
    total,
    weightPath,
    essentialItemsPath,
    redundancyAndVersatilityPath,
    weightStrokeDashoffset,
    essentailItemsStrokeDashoffset,
    redundancyAndVersatilityStrokeDashoffset,
  };
};
