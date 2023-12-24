import { Pack } from '../../drizzle/methods/Pack';

/**
 * Edits a pack in the service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId
 * @param {object} packData
 * @return {object}
 */
export const editPackService = async (
  packId,
  packData,
) => {
  const packClass = new Pack();
  const updatedPack = await packClass.update(packData, packId);
  return updatedPack;
};
