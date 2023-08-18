import Item from "../../models/itemModel";
import { ItemCategoryModel } from "../../models/itemCategory";

export const editItemService = async (_id, name, weight, unit, quantity, type) => {
    const category = await ItemCategoryModel.findOne({
      name: type,
    });
  
    const newItem = await Item.findOneAndUpdate(
      { _id },
      {
        name,
        weight,
        unit,
        quantity,
        category: category.id,
      },
      {
        returnOriginal: false,
      }
    ).populate("category", "name");
  
    return newItem;
  };
  