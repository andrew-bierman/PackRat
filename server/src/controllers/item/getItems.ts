import { publicProcedure } from '../../trpc';
import { ItemNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import Item from '../../models/itemModel';
import { getItemsService } from '../../services/item/item.service';
import * as validator from '../../middleware/validators/index';
import { TRPCError } from '@trpc/server';
/**
 * Retrieves a list of items associated with a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.packId - The ID of the pack to retrieve items for.
 * @return {Object} An array of items associated with the pack.
 */
export const getItems = async (req, res, next) => {
  try {
    const { packId } = req.params;

    const items = await getItemsService(packId);

    res.locals.data = items;
    responseHandler(res);
  } catch (error) {
    next(ItemNotFoundError);
  }
};

export function getItemsRoute() {
  return publicProcedure.input(validator.getItems)
    .query(async (opts) => {
      try {
        const { packId } = opts.input;
        return await getItemsService(packId);
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: ItemNotFoundError.message });
      }
    });
}