export const computeTotalScore = (scores) => {
  if (!scores) return;
  const scoresArray = Object.values(scores);
  const sum = scoresArray.reduce((total, score) => total + score, 0);
  const average = scoresArray.length > 0 ? sum / scoresArray.length : 0;

  return Math.round(average * 100) / 100;
};
