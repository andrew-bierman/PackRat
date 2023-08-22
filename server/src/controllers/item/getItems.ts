import { ItemNotFoundError } from "../../helpers/errors";
import Item from "../../models/itemModel";
import { getItemsService } from "../../services/item/item.service";

/**
 * Retrieves a list of items associated with a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.packId - The ID of the pack to retrieve items for.
 * @return {Object} An array of items associated with the pack.
 */
export const getItems = async (req, res,next) => {
  try {
    const { packId } = req.params;

    const items = await getItemsService(packId);

    res.status(200).json(items);
  } catch (error) {
    next(ItemNotFoundError)
  }
};
