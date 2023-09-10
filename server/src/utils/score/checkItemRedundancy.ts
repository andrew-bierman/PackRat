/**
 * Calculates the redundancy score of a given pack.
 *
 * @param {any[]} packItems - An array of items in the pack.
 * @return {number} The redundancy score of the pack.
 */
// Calculate the essential items score
export function checkItemRedundancy(packItems: any) {
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
  const uniquePackItems = new Set(
    packItems.map((item: any) => item.name.toLowerCase()),
  );

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
