import { prisma } from '../../prisma';
/**
 * Retrieves the destination service based on the given ID.
 *
 * @param {string} id - The ID of the destination service.
 * @return {Promise<any>} A promise that resolves to the destination service.
 */
export const getDestinationService = async (id) => {
  const way = await prisma.way.findUnique({ where: { id } });

  if (way) {
    return way;
  }

  const node = await prisma.node.findUnique({ where: { id } });

  return node;
};
