// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';
import { eq } from 'drizzle-orm';
import { item as itemTable } from '../../db/schema';
import { Pack } from '../../drizzle/methods/Pack';
import { pack as packTable } from '../../db/schema';

/**
 * Adds a global item to the pack service.
 *  @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @param {string} itemId - The ID of the item.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object>} - A promise that resolves to the added item.
 */
export const addGlobalItemToPackService = async (packId, itemId, ownerId) => {
  const item = new Item();
  const pack = new Pack();
  const itemResult = await item.findUniqueItem({
    where: { id: itemId },
    with: { categoryDocument: { columns: { name: true } } },
  });

  await pack.update(
    {
      itemDocuments: {
        connect: { id: itemId },
      },
    },
    packId,
    eq(packTable.id, packId),
  );

  const uniqueOwners = [...new Set([...itemResult.owners, ownerId])];

  const updatedItem = await item.update(
    {
      owners: uniqueOwners,
      packDocuments: {
        id: packId,
      },
    },
    itemId,
    eq(itemTable.id, itemId),
  );

  return updatedItem;
};
