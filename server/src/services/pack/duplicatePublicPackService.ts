import { Pack } from '../../drizzle/methods/Pack';

/**
 * Duplicates a public pack service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack to duplicate.
 * @param {string} ownerId - The ID of the owner of the duplicated pack.
 * @param {Array} items - The items to be included in the duplicated pack.
 * @return {Object} - An object containing the duplicated pack.
 */
export const duplicatePublicPackService = async (packId, ownerId, items) => {
  const packClass = new Pack();
  const existingPack = await packClass.findUniquePack({
    where: {
      id: packId, // Replace 'id' with the actual primary key field in your model
    },
    with: {
      ownerDocuments: true,
    },
  });

  if (!existingPack) {
    throw new Error('Pack not found');
  }

  const newPack = await packClass.create({
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
      ownerDocuments: existingPack.owners.map((ownerId) => ({ id: ownerId })),
      ownerDocument: ownerId,
      itemDocuments: items.map((item) => ({ id: item.id })),
      type: existingPack.type,
    },
  });

  return { pack: newPack };
};
