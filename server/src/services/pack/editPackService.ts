import { PrismaClient } from '@prisma/client/edge';

/**
 * Edits a pack in the service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId
 * @param {object} packData
 * @return {object}
 */
export const editPackService = async (
  prisma: PrismaClient,
  packId,
  packData,
) => {
  const updatedPack = await prisma.pack.update({
    where: { id: packId },
    data: packData,
  });

  return updatedPack;
};
