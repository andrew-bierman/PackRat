import { publicProcedure } from '../../trpc';
import { ItemNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getItemsGloballyService } from '../../services/item/item.service';
import * as validators from "@packrat/packages"
import { authorizedProcedure } from '../../middleware/authorizedProcedure';
/**
 * Retrieves globally available items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The items, page, and total pages.
 */
export const getItemsGlobally = async (req, res, next) => {
  try {
    const result = await getItemsGloballyService(req.query.limit, req.query.page);

    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(ItemNotFoundError);
  }
};

export function getItemsGloballyRoute() {
  return authorizedProcedure.input(validators.getItemsGlobally).query(async (opts) => {
    return await getItemsGloballyService(opts.input.limit, opts.input.page);
  })
}