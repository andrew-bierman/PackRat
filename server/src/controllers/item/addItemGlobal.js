import { ItemCategoryModel } from "../../models/itemCategory.ts";
import Item from "../../models/itemModel.ts";
import { ItemCategory, ItemCategoryEnum } from "../../utils/itemCategory.ts";

/**
 * Adds an item globally.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The added item.
 */
export const addItemGlobal = async (req, res) => {
    try {
      const { name, weight, quantity, unit, type } = req.body;
  
      let category = null;
      let newItem = null;
      // need to look into below logic. open window issue
      switch (type) {
        case ItemCategoryEnum.FOOD: {
          category = await ItemCategoryModel.findOne({
            name: ItemCategoryEnum.FOOD,
          });
  
          newItem = await Item.create({
            name,
            weight,
            quantity,
            unit,
            category: category._id,
            global: true,
          });
          newItem = await Item.findById(newItem.id).populate("category", "name");
  
          break;
        }
        case ItemCategoryEnum.WATER: {
          category = await ItemCategoryModel.findOne({
            name: ItemCategoryEnum.WATER,
          });
          newItem = await Item.create({
            name,
            weight,
            quantity: 1,
            unit,
            category: category._id,
            global: true,
          });
          newItem = await Item.findById(newItem.id).populate("category", "name");
          break;
        }
        default: {
          category = await ItemCategoryModel.findOne({
            name: ItemCategoryEnum.ESSENTIALS,
          });
  
          newItem = await Item.create({
            name,
            weight,
            quantity,
            unit,
            category: category._id,
            global: true,
          });
  
          newItem = await Item.findById(newItem.id).populate("category", "name");
  
          break;
        }
      }
  
      res.status(200).json({
        msg: "success",
        newItem: newItem,
      });
    } catch (error) {
      res.status(404).json({ msg: "Unable to add item", error: error.message });
    }
  };