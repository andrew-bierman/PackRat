// import { prisma } from '../prisma';

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
