import { prisma } from '../../prisma/index';
/**
 * Adds a global item to the pack service.
 *
 * @param {string} packId - The ID of the pack.
 * @param {string} itemId - The ID of the item.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object>} - A promise that resolves to the added item.
 */
export const addGlobalItemToPackService = async (packId, itemId, ownerId) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { category: { select: { name: true } } } as never,
  });

  await prisma.pack.update({
    where: { id: packId },
    data: {
      items: {
        connect: { id: item.id },
      } as never,
    },
  });

  const updatedItem = await prisma.item.update({
    where: { id: item.id },
    data: {
      owners: {
        connect: { id: ownerId },
      } as never,
    },
  });

  return item;
};
