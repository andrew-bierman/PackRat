import { ItemNotFoundError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import { getItemsGloballyService } from "../../services/item/item.service";

/**
 * Retrieves globally available items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The items, page, and total pages.
 */
export const getItemsGlobally = async (req, res,next) => {
  try {
    const result = await getItemsGloballyService(req);

    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(ItemNotFoundError)
  }
};