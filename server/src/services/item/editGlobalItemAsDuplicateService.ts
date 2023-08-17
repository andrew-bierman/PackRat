import Item from "../../models/itemModel.ts";
import Pack from "../../models/packModel.ts";
import { ItemCategoryModel } from "../../models/itemCategory.ts";

export const editGlobalItemAsDuplicateService = async (itemId, packId, name, weight, quantity, unit, type) => {
    let category = await ItemCategoryModel.findOne({
      name: type,
    });
  
    let newItem = await Item.create({
      name,
      weight,
      unit,
      quantity,
      category: category._id,
      global: false,
      packs: [packId],
    });
  
    newItem = await Item.findById(newItem._id).populate("category", "name");
  
    await Pack.updateOne(
      { _id: packId },
      { $addToSet: { items: newItem._id } }
    );
  
    await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });
  
    await Item.updateOne(
      {
        _id: itemId,
      },
      {
        $pull: {
          packs: packId,
        },
      }
    );
  
    return newItem;
  };