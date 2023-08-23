import { UnableToEditItemError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import { editItemService } from "../../services/item/item.service";

export const editItem = async (req, res,next) => {
  try {
    const { _id, name, weight, unit, quantity, type } = req.body;

    const newItem = await editItemService(_id, name, weight, unit, quantity, type);

    res.locals.data = newItem;
    responseHandler(res);
  } catch (error) {
    next(UnableToEditItemError)
  }
};