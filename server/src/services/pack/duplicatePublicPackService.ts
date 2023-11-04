import { prisma } from "../../prisma/index";
/**
 * Duplicates a public pack service.
 *
 * @param {string} packId - The ID of the pack to duplicate.
 * @param {string} ownerId - The ID of the owner of the duplicated pack.
 * @param {Array} items - The items to be included in the duplicated pack.
 * @return {Object} - An object containing the duplicated pack.
 */
export const duplicatePublicPackService = async (packId, ownerId, items) => {
  const existingPack = await prisma.pack.findUnique({
    where: {
      id: packId, // Replace 'id' with the actual primary key field in your model
    },
  });
  
  if (!existingPack) {
    throw new Error('Pack not found');
  }
  
  const newPack = await prisma.pack.create({
    data: {
      name: existingPack.name,
      items,
      owner_id: existingPack.owner_id,
      is_public: false,
  
      createdAt: new Date().toISOString(),
     
      grades: {
        set: { ...existingPack.grades },
      },
      scores: {
        set: { ...existingPack.scores },
      },
      type: existingPack.type,
    } as any,
  });
  
  return { pack: newPack };
  
};
