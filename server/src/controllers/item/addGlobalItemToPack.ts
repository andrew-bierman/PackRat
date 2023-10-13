import { publicProcedure } from '../../trpc';
import { ItemNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { addGlobalItemToPackService } from '../../services/item/item.service';
import { z } from 'zod';

/**
 * Adds a global item to a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item.
 */
export const addGlobalItemToPack = async (c, next) => {
  try {
    const { packId } = c.req.param();
    const { itemId, ownerId } = c.req.json();

    const result = await addGlobalItemToPackService(packId, itemId, ownerId);

    res.locals.data = result;
    responseHandler(c);
  } catch (error) {
    next(ItemNotFoundError);
  }
};

export function addGlobalItemToPackRoute() {
  return publicProcedure
    .input(
      z.object({
        packId: z.string(),
        itemId: z.string(),
        ownerId: z.string(),
      }),
    )
    .query(async (opts) => {
      const { packId, itemId, ownerId } = opts.input;
      return await addGlobalItemToPackService(packId, itemId, ownerId);
    });
}
