import { prisma } from "../../prisma/index";

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

  console.log('newPack', newPack);

  // Check if a pack with the same name already exists
  const existingPack = await prisma.pack.findFirst({
    where: {
      name,
    },
  });

  if (existingPack) {
    // A pack with the same name already exists
    throw new Error('A pack with the same name already exists');
  }

  // Create the new pack
  const createdPack = await prisma.pack.create({
    data: newPack as any,
  });

  return { createdPack };
};

