import { ItemCategoryModel } from "../../models/itemCategory.ts";
import Item from "../../models/itemModel.ts";

export const editItem = async (req, res) => {
  try {
    const { _id, name, weight, unit, quantity, type } = req.body;
    const category = await ItemCategoryModel.findOne({
      name: type,
    });
    let newItem = await Item.findOneAndUpdate(
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

    res.status(200).json(newItem);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit item" });
  }
};