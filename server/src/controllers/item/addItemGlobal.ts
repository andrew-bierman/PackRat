import { addItemGlobalService } from '../../services/item/item.service';

/**
 * Adds an item globally.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The added item.
 */

export const addItemGlobal = async (req, res) => {
  try {
    const { name, weight, quantity, unit, type } = req.body;

    const newItem = await addItemGlobalService(
      name,
      weight,
      quantity,
      unit,
      type,
    );

    res.status(200).json({
      msg: 'success',
      newItem,
    });
  } catch (error) {
    res.status(404).json({ msg: 'Unable to add item', error: error.message });
  }
};
