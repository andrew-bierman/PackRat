export const useGradingPie = (scores) => {
  const { weightScore, essentialItemsScore, redundancyAndVersatilityScore } =
    scores;
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const total =
    weightScore + essentialItemsScore + redundancyAndVersatilityScore;

  const weightPercentage = (weightScore / total) * 100;
  const essentialItemsPercentage = (essentialItemsScore / total) * 100;
  const redundancyAndVersatilityPercentage =
    (redundancyAndVersatilityScore / total) * 100;

  const weightStrokeDashoffset =
    circleCircumference - (circleCircumference * weightPercentage) / 100;
  const essentialItemsStrokeDashoffset =
    circleCircumference -
    (circleCircumference * essentialItemsPercentage) / 100;
  const redundancyAndVersatilityStrokeDashoffset =
    circleCircumference -
    (circleCircumference * redundancyAndVersatilityPercentage) / 100;

  const essentialItemsAngle = (weightScore / total) * 360;
  const redundancyAndVersatilityAngle =
    essentialItemsAngle + (essentialItemsScore / total) * 360;
  return {
    radius,
    circleCircumference,
    total,
    weightStrokeDashoffset,
    essentialItemsStrokeDashoffset,
    redundancyAndVersatilityStrokeDashoffset,
    essentialItemsAngle,
    redundancyAndVersatilityAngle,
  };
};
