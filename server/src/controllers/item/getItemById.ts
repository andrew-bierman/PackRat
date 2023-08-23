import { ItemNotFoundError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import { getItemByIdService } from "../../services/item/item.service";

/**
 * Retrieves an item by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body._id - The ID of the item to retrieve.
 * @return {Object} The retrieved item.
 */
export const getItemById = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const item = await getItemByIdService(_id);

    res.locals.data = item;
    responseHandler(res);
  } catch (error) {
    next(ItemNotFoundError)
  }
};
