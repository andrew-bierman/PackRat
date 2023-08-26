import { UnableToAddItemError } from '../../helpers/errors';
import { addItemGlobalService } from '../../services/item/item.service';
import { responseHandler } from '../../helpers/responseHandler';
/**
 * Adds an item globally.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The added item.
 */

export const addItemGlobal = async (req, res, next) => {
  try {
    const { name, weight, quantity, unit, type } = req.body;

    const newItem = await addItemGlobalService(
      name,
      weight,
      quantity,
      unit,
      type,
    );

    res.locals.data = newItem;
    responseHandler(res);
  } catch (error) {
    next(UnableToAddItemError);
  }
};
