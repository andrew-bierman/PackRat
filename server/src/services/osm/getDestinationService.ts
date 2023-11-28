import { PrismaClient } from '@prisma/client/edge';
import { Way } from '../../prisma/methods';
/**
 * Retrieves the destination service based on the given ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} id - The ID of the destination service.
 * @return {Promise<any>} A promise that resolves to the destination service.
 */
export const getDestinationService = async (prisma: PrismaClient, id) => {
  const way = await prisma.way.findFirst({ where: { id } });

  if (way) {
    return Way(way).toJSON(prisma);
  }

  const node = await prisma.node.findFirst({ where: { id } });

  return node;
};
