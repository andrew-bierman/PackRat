import { checkEssentialItems } from './checkEssentialItems';
import { checkItemRedundancy } from './checkItemRedundancy';
// Scoring System for Packs:

// Weight:
// Scale: 1-10 (10 being the lightest pack)
// Essential Items:
// Scale: 1-10 (10 being all essential items present)
// Redundancy and Versatility:
// Scale: 1-10 (10 being the least redundancy and high versatility)

export function calculatePackScore(packData: any) {
  console.log('Calculating pack score...');
  console.log('packData: ', packData);
  const { items } = packData;
  // console.log("weight: ", weight);
  // console.log('items: ', items)

  const totalWeight = packData.items.reduce((total: number, item: any) => {
    if (item.unit === 'lb') {
      return total + item.weight * 16 * item.quantity; // Considering 1 lb equals 16 oz
    } else {
      return total + item.weight * item.quantity;
    }
  }, 0);

  // Define the grading thresholds for each factor
  const weightThreshold = 7; // A weight of 7 or below is considered good
  const essentialItemsThreshold = 8; // An essential items score of 8 or above is considered good
  const redundancyAndVersatilityThreshold = 8; // A redundancy and versatility score of 8 or above is considered good

  // Calculate the scores for each factor, using the helper functions defined above

  const weightScore = Math.max(11 - Math.floor(totalWeight / 10), 1);
  const essentialItemsScore = checkEssentialItems(items);
  const redundancyAndVersatilityScore = checkItemRedundancy(items);

  // Calculate the scores for each factor
  // const weightScore = (weight / 10) * 100;
  // const essentialItemsScore = (essentialItems / 10) * 100;
  // const redundancyAndVersatilityScore = (redundancyAndVersatility / 10) * 100;

  // Determine the grades for each factor based on the thresholds
  const weightGrade =
    weightScore >= weightThreshold ? 'Good' : 'Needs Improvement';
  const essentialItemsGrade =
    essentialItemsScore >= essentialItemsThreshold
      ? 'Good'
      : 'Needs Improvement';
  const redundancyAndVersatilityGrade =
    redundancyAndVersatilityScore >= redundancyAndVersatilityThreshold
      ? 'Good'
      : 'Needs Improvement';

  // Calculate the total score
  const totalScore =
    (weightScore + essentialItemsScore + redundancyAndVersatilityScore) / 3;

  // Round the score to two decimal places
  const roundedScore = Math.round(totalScore * 100) / 100;

  return {
    totalScore: roundedScore,
    grades: {
      weight: weightGrade,
      essentialItems: essentialItemsGrade,
      redundancyAndVersatility: redundancyAndVersatilityGrade,
    },
    scores: {
      weightScore,
      essentialItemsScore,
      redundancyAndVersatilityScore,
    },
  };
}
