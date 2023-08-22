import { UnableToDeleteItemError } from "../../helpers/errors";
import { deleteGlobalItemService } from "../../services/item/item.service";

/**
 * Deletes a global item.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - Returns a promise that resolves to void.
 */
export const deleteGlobalItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const itemDeleted = await deleteGlobalItemService(itemId);

    res.status(200).json({
      data: itemDeleted,
    });
  } catch (error) {
    next(UnableToDeleteItemError)
  }
};
