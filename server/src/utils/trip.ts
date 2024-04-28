// import { prisma } from '../prisma';

// /**
//  * Validates the trip data before creating a new trip.
//  *
//  * @param {any} name - The name of the trip.
//  * @param {any} duration - The duration of the trip.
//  * @param {any} weather - The weather conditions of the trip.
//  * @param {any} start_date - The start date of the trip.
//  * @param {any} end_date - The end date of the trip.
//  * @param {any} destination - The destination of the trip.
//  * @param {any} owner_id - The ID of the trip owner.
//  * @param {any} packs - The list of packs for the trip.
//  * @param {any} is_public - Indicates if the trip is public or not.
//  * @throws {Error} Throws an error if any required fields are missing.
//  * @return {Promise<any>} The newly created trip.
//  */
// export const tripValidation = async ({
//   name,
//   duration,
//   weather,
//   start_date,
//   end_date,
//   destination,
//   owner_id,
//   packs,
//   is_public,
//   description,
// }) => {
//   if (
//     !name ||
//     !duration ||
//     !weather ||
//     !start_date ||
//     !end_date ||
//     !destination ||
//     !owner_id ||
//     !packs ||
//     !is_public
//   ) {
//     throw new Error('All fields must be filled');
//   }

//   const trip = await prisma.trip.create({
//     data: {
//       description: description ?? '',
//       name,
//       duration,
//       weather,
//       start_date,
//       end_date,
//       destination,
//       is_public,
//       packs: {
//         // Assuming 'packs' is an array of pack IDs related to the trip
//         connect: packs.map((packId) => ({ id: packId })),
//       },
//       owner: {
//         connect: { id: owner_id },
//       },
//     },
//   });

//   return trip;
// };
