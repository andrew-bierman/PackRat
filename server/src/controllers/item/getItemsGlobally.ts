import { ItemNotFoundError } from "../../helpers/errors";
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

    res.status(200).json(result);
  } catch (error) {
    next(ItemNotFoundError)
  }
};