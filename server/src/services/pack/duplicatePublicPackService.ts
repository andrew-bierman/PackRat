import { Pack } from '../../drizzle/methods/pack';
import { ItemPacks } from '../../drizzle/methods/ItemPacks';

/**
 * Duplicates a public pack service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack to duplicate.
 * @param {string} ownerId - The ID of the owner of the duplicated pack.
 * @param {Array} items - The items to be included in the duplicated pack.
 * @return {Object} - An object containing the duplicated pack.
 */
export const duplicatePublicPackService = async (
  packId: string,
  ownerId: string,
  items: any[],
): Promise<object> => {
  const packClass = new Pack();
  const itemPacksClass = new ItemPacks();
  const existingPack = await packClass.findPack({ id: packId });
  if (!existingPack) {
    throw new Error('Pack not found');
  }
  const newPack = await packClass.create({
    name: existingPack.name,
    is_public: false,
    owner_id: ownerId,
    type: existingPack.type,
  });

  items?.map(
    async (itemId: any) =>
      await itemPacksClass.create({ itemId, packId: newPack.id }),
  );

  return { pack: newPack };
};
