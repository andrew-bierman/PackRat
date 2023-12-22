import Pack from '../../models/packModel';

/**
 * Adds a new pack service.
 *
 * @param {string} name - The name of the pack.
 * @param {string} owner_id - The ID of the pack owner.
 * @return {Object} An object containing the created pack.
 */
export const addPackService = async (name, owner_id) => {
  const newPack = {
    name,
    owner_id,
    items: [],
    is_public: false,
    favorited_by: [],
    createdAt: new Date(),
    owners: [owner_id],
  };

  const exists = await Pack.find({ name });

  const createdPack = await Pack.create(newPack);

  return { createdPack };
};
