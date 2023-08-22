import { UnableToAddItemError } from "../../helpers/errors";
import { addItemService } from "../../services/item/item.service";

/**
 * Adds an item to the database based on the provided request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item and pack ID.
 */
export const addItem = async (req, res, next) => {
  try {
    const { name, weight, quantity, unit, packId, type, ownerId } = req.body;

    const result = await addItemService(
      name,
      weight,
      quantity,
      unit,
      packId,
      type,
      ownerId,
    );

    res.status(200).json({
      msg: 'success',
      newItem: result.newItem,
      packId: result.packId,
    });
  } catch (error) {
    next(UnableToAddItemError)
  }
};
