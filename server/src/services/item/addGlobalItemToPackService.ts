import Item from "../../models/itemModel.ts";
import Pack from "../../models/packModel.ts";
import { ItemCategoryModel } from "../../models/itemCategory.ts";
import {  ItemCategoryEnum } from "../../utils/itemCategory.ts";

export const addGlobalItemToPackService = async (packId, itemId, ownerId) => {
  const item = await Item.findById(itemId).populate("category", "name");

  await Pack.updateOne({ _id: packId }, { $addToSet: { items: item._id } });

  await Item.findByIdAndUpdate(
    item._id,
    {
      $addToSet: {
        owners: ownerId,
      },
    },
    { new: true }
  );

  await Item.findByIdAndUpdate(
    item._id,
    {
      $addToSet: {
        packs: packId,
      },
    },
    { new: true }
  );

  return item;
};
