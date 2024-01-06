import { Way } from '../../drizzle/methods/Way';
import { Node } from '../../drizzle/methods/Node';

/**
 * Retrieves the destination service based on the given ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} id - The ID of the destination service.
 * @return {Promise<any>} A promise that resolves to the destination service.
 */
export const getDestinationService = async (id) => {
  const wayClass = new Way();
  const nodeClass = new Node();
  const way = await wayClass.findUniqueWay({ where: { id } });

  if (way) {
    return way;
  }

  const node = await nodeClass.findUniqueNode({ where: { id } });

  return node;
};
