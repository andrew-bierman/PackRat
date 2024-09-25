// Scoring System for Packs:

// Weight:
// Scale: 1-10 (10 being the lightest pack)
// Essential Items:
// Scale: 1-10 (10 being all essential items present)
// Redundancy and Versatility:
// Scale: 1-10 (10 being the least redundancy and high versatility)

/**
 * Calculates the score of essential items in a given pack.
 *
 * @param {any} packItems - An array of items in the pack.
 * @return {number} The score of essential items in the pack.
 */
function checkEssentialItems(packItems: any) {
  const essentialItems: any = {
    water: ['water', 'hydration'],
    food: ['food', 'nutrition'],
    map: ['map', 'navigation'],
    compass: ['compass'],
    firstAidKit: ['first aid kit', 'medical kit'],
    clothing: ['clothing', 'apparel'],
    shelter: ['shelter', 'tent'],
    firestarter: ['firestarter', 'firelighter'],
    navigationTools: ['navigation tools'],
    lightSource: ['light source', 'flashlight'],
    communicationDevice: ['communication device', 'phone'],
  };

  const totalItems = Object.keys(essentialItems).length;
  let presentItems = 0;

  for (const item in essentialItems) {
    // Check if the pack contains any item that matches or partially matches any name in the array
    const matchingItem = packItems.find((packItem: any) =>
      essentialItems[item].some((itemName: string) =>
        packItem.name.toLowerCase().includes(itemName.toLowerCase()),
      ),
    );

    if (matchingItem) {
      presentItems++;
    }
  }

  const essentialItemsScore = (presentItems / totalItems) * 10;

  return essentialItemsScore;
}

/**
 * Calculates the redundancy score of a given pack.
 *
 * @param {any[]} packItems - An array of items in the pack.
 * @return {number} The redundancy score of the pack.
 */
// Calculate the essential items score
function checkRedundancy(packItems: any) {
  const redundantItems: any = {
    tools: ['multi-tool', 'hammer'],
    lightSources: ['flashlight', 'extra flashlight'],
    powerSources: ['batteries', 'extra batteries'],
    clothing: ['socks', 'extra socks'],
    food: ['food', 'extra food'],
    waterContainers: ['water container', 'backup water container'],
  };

  const totalRedundantItems = Object.keys(redundantItems).length;
  let presentRedundantItems = 0;

  // Create a set of unique lowercase item names for efficient comparison
  // const uniquePackItems = new Set(
  //   packItems.map((item: any) => item.name.toLowerCase()),
  // );

  for (const item in redundantItems) {
    // Check if the pack contains more than one item that matches or partially matches any name in the array
    const matchingItems = packItems.filter((packItem: any) =>
      redundantItems[item].some((itemName: string) =>
        packItem.name.toLowerCase().includes(itemName.toLowerCase()),
      ),
    );

    if (matchingItems.length > 1) {
      presentRedundantItems++;
    }
  }

  // Exclude certain items from being considered for redundancy
  const excludedItems = ['extra socks', 'extra food', 'backup water container'];
  const effectiveTotalRedundantItems =
    totalRedundantItems - excludedItems.length;

  // Calculate the redundancy score
  const redundancyScore =
    ((effectiveTotalRedundantItems - presentRedundantItems) /
      effectiveTotalRedundantItems) *
    10;

  return redundancyScore;
}

export function calculatePackScore(packData: any) {
  console.log('Calculating pack score...');
  console.log('packData: ', packData);
  const itemDocuments = packData.items;
  // console.log("weight: ", weight);
  // console.log('items: ', items)

  if (!itemDocuments || itemDocuments.length === 0) {
    return null;
  }

  const totalWeight = itemDocuments.reduce((total: number, item: any) => {
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
  const essentialItemsScore = checkEssentialItems(itemDocuments);
  const redundancyAndVersatilityScore = checkRedundancy(itemDocuments);

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
    grades: JSON.stringify({
      weight: weightGrade,
      essentialItems: essentialItemsGrade,
      redundancyAndVersatility: redundancyAndVersatilityGrade,
    }),
    scores: JSON.stringify({
      weightScore,
      essentialItemsScore,
      redundancyAndVersatilityScore,
    }),
  };
}
