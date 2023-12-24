import { PrismaClient } from '@prisma/client/edge';
import { Item } from '../../drizzle/methods/Item';
// import { prisma } from '../../prisma';

/**
 * Retrieves globally available items.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {Object} req - The request object.
 * @param {number} reqlimit - The limit for the number of items to retrieve.
 * @param {number} reqpage - The page number.
 * @return {Object} An object containing items, page, and totalPages.
 */
export const getItemsGloballyService = async (
  prisma: PrismaClient,
  reqlimit,
  reqpage,
) => {
  const itemClass = new Item();
  const totalItems: any = await itemClass.count();
  const limit = Number(reqlimit) || totalItems;
  const totalPages = Math.ceil(totalItems / limit);
  const page = Number(reqpage) || 1;
  const startIndex = (page - 1) * limit;

  const items = await itemClass.findMany({
    where: { global: true },
    with: {
      categoryDocument: {
        columns: { name: true }
      }
    },
    offset: startIndex,
    limit: limit,
    orderBy: (item, { desc }) => desc(item.createdAt),
  });

  return {
    items,
    page,
    totalPages,
  };
};
