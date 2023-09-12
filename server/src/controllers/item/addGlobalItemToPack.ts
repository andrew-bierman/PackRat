import { ItemNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { addGlobalItemToPackService } from '../../services/item/item.service';
import * as validators from "@packrat/packages"
import { authorizedProcedure } from '../../middleware/authorizedProcedure';

/**
 * Adds a global item to a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item.
 */
export const addGlobalItemToPack = async (req, res, next) => {
  try {
    const { packId } = req.params;
    const { itemId, ownerId } = req.body;

    const result = await addGlobalItemToPackService(packId, itemId, ownerId);

    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(ItemNotFoundError);
  }
};


export function addGlobalItemToPackRoute() {
  return authorizedProcedure.input(validators.addGlobalItemToPack).query(async (opts) => {
    const { packId, itemId, ownerId } = opts.input;
    return await addGlobalItemToPackService(packId, itemId, ownerId);
  })
}