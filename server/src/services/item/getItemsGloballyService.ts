import { PrismaClient } from '@prisma/client/edge';
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
  const totalItems = await prisma.item.count({
    where: {
      global: true,
    },
  });
  const limit = Number(reqlimit) || totalItems;
  const totalPages = Math.ceil(totalItems / limit);
  const page = Number(reqpage) || 1;
  const startIndex = (page - 1) * limit;

  const items = await prisma.item.findMany({
    where: {
      global: true,
    },
    include: {
      categoryDocument: {
        select: {
          name: true,
        },
      },
    },
    skip: startIndex,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    items,
    page,
    totalPages,
  };
};
