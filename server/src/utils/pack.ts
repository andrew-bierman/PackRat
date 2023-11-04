import {prisma} from "src/prisma"
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
export const packValidation = async ({
  name,
  items,
  owner_id,
  is_public,
  favorited_by,
  createdAt,
}: {
  name: string;
  items: string[];
  owner_id: string;
  is_public: boolean;
  favorited_by: string[];
  createdAt: string;
}) => {
  if (!name || !owner_id) {
    throw new Error('All fields must be filled');
  }

  const pack = await prisma.pack.create({
    data: {
      name,
      items: {
        // Assuming 'items' is an array of item IDs related to the pack
        connect: items.map((itemId) => ({ id: itemId })),
      },
      owner_id,
      is_public,
      favorited_by: {
        // Assuming 'favorited_by' is an array of user IDs related to the pack
        connect: favorited_by.map((userId) => ({ id: userId })),
      },
      createdAt,
    },
  } as any);

  return pack;
};
