import Item from "../../models/itemModel.ts";
import Pack from "../../models/packModel.ts";
import { ItemCategoryModel } from "../../models/itemCategory.ts";
import { ItemCategoryEnum } from "../../utils/itemCategory.ts";

export const addItemGlobalService = async (name, weight, quantity, unit, type) => {
    let category = null;
    let newItem = null;
  
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
  
    return newItem;
  };
