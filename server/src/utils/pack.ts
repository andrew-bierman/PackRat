// import { prisma } from '../prisma';
/**
 * Creates a new pack validation.
 *
 * @param {string} name - The name of the pack.
 * @param {string[]} items - The items in the pack.
 * @param {string} owner_id - The ID of the owner.
 * @param {boolean} is_public - Whether the pack is public.
 * @param {string[]} favorited_by - The users who have favorited the pack.
 * @param {string} createdAt - The creation date of the pack.
 * @throws {Error} If any of the required fields are missing.
 * @return {Promise<Object>} The created pack.
 */
// export const packValidation = async ({
//   name,
//   items,
//   owner_id,
//   is_public,
//   favorited_by,
//   createdAt,
// }: {
//   name: string;
//   items: string[];
//   owner_id: string;
//   is_public: boolean;
//   favorited_by: string[];
//   createdAt: string;
// }) => {
//   if (!name || !owner_id) {
//     throw new Error('All fields must be filled');
//   }

import { Pack } from '../drizzle/methods/pack';

//   const pack = await prisma.pack.create({
//     data: {
//       name,
//       items: {
//         // Assuming 'items' is an array of item IDs related to the pack
//         connect: items.map((itemId) => ({ id: itemId })),
//       },
//       owners: {
//         connect: { id: owner_id },
//       },
//       is_public,
//       favorited_by: {
//         // Assuming 'favorited_by' is an array of user IDs related to the pack
//         connect: favorited_by.map((userId) => ({ id: userId })),
//       },
//       createdAt,
//     },
//   });

//   return pack;
// };

export const DEFAULT_SORT = { createdAt: 'DESC' };

export const SORT_OPTIONS = {
  // Favorite: { favorites_count: 'DESC' },
  Favorite: DEFAULT_SORT,
  // Lightest: { total_weight: 'ASC' },
  Lightest: DEFAULT_SORT,
  // Heaviest: { total_weight: 'DESC' },
  Heaviest: DEFAULT_SORT,
  'Most Items': DEFAULT_SORT,
  'Fewest Items': DEFAULT_SORT,
  Oldest: { createdAt: 'ASC' },
  'Most Recent': { updatedAt: 'DESC' },
  'Highest Score': { total_score: 'DESC' },
  'Lowest Score': { total_score: 'ASC' },
  'A-Z': { name: 'ASC' },
  'Z-A': { name: 'DESC' },
  'Most Owners': { owners: 'DESC' },
};

interface SortFunctionProps {
  packs: any[];
  queryBy: string;
  sortItems: boolean;
  ownerId?: string;
  is_public?: boolean;
}

export const sortFunction = async ({
  packs,
  queryBy,
  sortItems,
  ownerId,
  is_public,
}: SortFunctionProps) => {
  const packClass = new Pack();
  let packsData;
  switch (queryBy) {
    case 'Most Items':
    case 'Fewest Items':
      packsData = await packClass.sortPacksByItems({
        queryBy,
        sortItems,
        ...(ownerId && { ownerId }),
        ...(is_public && { is_public }),
      });
      break;
    case 'Heaviest':
    case 'Lightest':
      packsData = await packClass.sortPacksByWeight(packs, queryBy);
      break;
    case 'Favorite':
      packsData = await packClass.sortPacksByFavoritesCount(packs);
      break;
    default:
      packsData = packs;
      break;
  }
  return packsData;
};
