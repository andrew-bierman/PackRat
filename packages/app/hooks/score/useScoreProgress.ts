export const useScoreProgress = (score, size, strokeWidth) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 100;
  const progressPath = progress * circumference;
  return {
    radius,
    circumference,
    progressPath,
  };
};
