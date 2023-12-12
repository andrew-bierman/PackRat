import { PrismaClient } from '@prisma/client/edge';

/**
 * Duplicates a public pack service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack to duplicate.
 * @param {string} ownerId - The ID of the owner of the duplicated pack.
 * @param {Array} items - The items to be included in the duplicated pack.
 * @return {Object} - An object containing the duplicated pack.
 */
export const duplicatePublicPackService = async (
  prisma: PrismaClient,
  packId,
  ownerId,
  items,
) => {
  const existingPack = await prisma.pack.findUnique({
    where: {
      id: packId, // Replace 'id' with the actual primary key field in your model
    },
    include: {
      ownerDocuments: true,
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
      ownerDocuments: {
        connect: existingPack.owners.map((ownerId) => ({ id: ownerId })),
      },
      ownerDocument: {
        connect: { id: ownerId },
      },
      itemDocuments: {
        connect: items.map((item) => ({ id: item.id })),
      },
      type: existingPack.type,
    },
  });

  return { pack: newPack };
};
