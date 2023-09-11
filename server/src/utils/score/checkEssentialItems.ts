/**
 * Calculates the score of essential items in a given pack.
 *
 * @param {any} packItems - An array of items in the pack.
 * @return {number} The score of essential items in the pack.
 */
export function checkEssentialItems(packItems: any) {
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
