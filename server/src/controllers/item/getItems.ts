import { publicProcedure } from '../../trpc';
import { ItemNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import Item from '../../models/itemModel';
import { getItemsService } from '../../services/item/item.service';
import * as validator from '../../middleware/validators/index';
/**
 * Retrieves a list of items associated with a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} c.req.param().packId - The ID of the pack to retrieve items for.
 * @return {Object} An array of items associated with the pack.
 */
export const getItems = async (c, next) => {
  try {
    const { packId } = c.req.param();

    const items = await getItemsService(packId);

    res.locals.data = items;
    responseHandler(c);
  } catch (error) {
    next(ItemNotFoundError);
  }
};

export function getItemsRoute() {
  return publicProcedure.input(validator.getItems).query(async (opts) => {
    const { packId } = opts.input;
    return await getItemsService(packId);
  });
}
