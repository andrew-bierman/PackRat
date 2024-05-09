import { Pack } from '../../drizzle/methods/pack';

/**
 * Edits a pack in the service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId
 * @param {object} packData
 * @return {object}
 */
export const editPackService = async (packData: any) => {
  const packClass = new Pack();
  const { id, name, is_public } = packData;
  const pack = await packClass.findPack({ id });
  if (!pack) {
    throw new Error('Pack not found');
  }
  const updatedData = {
    id,
    is_public,
    name: name || pack.name,
  };
  const updatedPack = await packClass.update(updatedData);
  return updatedPack;
};
