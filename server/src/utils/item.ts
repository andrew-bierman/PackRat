// import { prisma } from '../prisma';

import { Item } from '../db/schema';

// /**
//  * Validates the item data and creates a new item.
//  *
//  * @param {Object} data - The item data.
//  * @param {string} data.name - The name of the item.
//  * @param {number} data.weight - The weight of the item.
//  * @param {number} data.quantity - The quantity of the item.
//  * @param {string} data.unit - The unit of measurement for the item.
//  * @param {string} data.packId - The ID of the pack the item belongs to.
//  * @throws {Error} Throws an error if any required field is missing.
//  * @returns {Promise<Object>} A promise that resolves to the newly created item.
//  */
// export const itemValidation = async ({
//   name,
//   weight,
//   quantity,
//   unit,
//   packId,
// }) => {
//   if (!name || !weight || !quantity || !unit || !packId) {
//     throw new Error('All fields must be filled');
//   }

//   const item = await prisma.item.create({
//     data: {
//       name,
//       weight,
//       quantity,
//       unit,
//       packs: {
//         connect: { id: packId },
//       },
//     },
//   });

//   return item;
// };

/**
 * Summarizes the item data into a string.
 */
export const summarizeItem = (item: Item & { category?: { name: string } }) => {
  const productName = item.name;
  const category = item.category?.name;
  const details = item.productDetails;
  const description = item.description;

  const parsedProductDetails = details
    ? Object.entries(details).reduce(
        (acc, [key, value]) => `${acc},${key}:${value}`,
        '',
      )
    : '';

  return `Title: ${productName}\nCategory: ${category}\nDetails: ${parsedProductDetails}\nDescription: ${description}`;
};
