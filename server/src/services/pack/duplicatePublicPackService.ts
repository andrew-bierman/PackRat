import { prisma } from '../../prisma';
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
    include: {
      owners: true,
    },
  });

  if (!existingPack) {
    throw new Error('Pack not found');
  }

  const newPack = await prisma.pack.create({
    data: {
      name: existingPack.name,
      is_public: false,
      createdAt: new Date().toISOString(),
      grades: {
        set: { ...existingPack.grades },
      },
      scores: {
        set: { ...existingPack.scores },
      },
      owners: {
        connect: existingPack.owners.map((owner) => ({ id: owner.id })),
      },
      owner: {
        connect: ownerId,
      },
      items: {
        connect: items,
      },
      type: existingPack.type,
    },
  });

  return { pack: newPack };
};
