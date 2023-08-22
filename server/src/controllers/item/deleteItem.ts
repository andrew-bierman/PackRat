import { UnableToDeleteItemError } from "../../helpers/errors";
import { deleteItemService } from "../../services/item/item.service";

/**
 * Deletes an item from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The deleted item.
 */

export const deleteItem = async (req, res, next) => {
  try {
    const { itemId, packId } = req.body;

    const itemDeleted = await deleteItemService(itemId, packId);

    res.status(200).json(itemDeleted);
  } catch (error) {
    console.error(error);
    next(UnableToDeleteItemError)
  }
};