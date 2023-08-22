import Pack from "../models/packModel";

/**
 * Creates a new pack validation.
 *
 * @param {string} name - The name of the pack.
 * @param {string[]} items - The items in the pack.
 * @param {string} owner_id - The ID of the owner.
 * @param {boolean} is_public - Whether the pack is public.
 * @param {string[]} favorited_by - The users who have favorited the pack.
 * @param {number} favorites_count - The number of times the pack has been favorited.
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
  favorites_count,
  createdAt,
}: { name: string, items: string[], owner_id: string, is_public: boolean, favorited_by: string[], favorites_count: number, createdAt: string }) => {
  if (!name || !owner_id) {
    throw new Error("All fields must be filled");
  }

  const pack = await Pack.create({
    name,
    items,
    owner_id,
    is_public,
    favorited_by,
    favorites_count,
    createdAt,
  });

  return pack;
};
