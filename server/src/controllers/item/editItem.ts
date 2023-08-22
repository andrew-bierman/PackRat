import { UnableToEditItemError } from "../../helpers/errors";
import { editItemService } from "../../services/item/item.service";

export const editItem = async (req, res,next) => {
  try {
    const { _id, name, weight, unit, quantity, type } = req.body;

    const newItem = await editItemService(
      _id,
      name,
      weight,
      unit,
      quantity,
      type,
    );

    res.status(200).json(newItem);
  } catch (error) {
    next(UnableToEditItemError)
  }
};
