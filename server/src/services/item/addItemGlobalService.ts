import Item from '../../models/itemModel';
import Pack from '../../models/packModel';
import { ItemCategoryModel } from '../../models/itemCategory';
import { ItemCategoryEnum } from '../../utils/itemCategory';

/**
 * Adds an item to the global service.
 *
 * @param {string} name - The name of the item.
 * @param {number} weight - The weight of the item.
 * @param {number} quantity - The quantity of the item.
 * @param {string} unit - The unit of measurement for the item.
 * @param {string} type - The category of the item.
 * @return {Promise<Object>} The newly created item.
 */
export const addItemGlobalService = async (
  name,
  weight,
  quantity,
  unit,
  type,
) => {
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
        category: category,
        global: true,
      });

      newItem = await Item.findById(newItem.id).populate('category', 'name');

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
        category: category,
        global: true,
      });

      newItem = await Item.findById(newItem.id).populate('category', 'name');

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
        category: category,
        global: true,
      });

      newItem = await Item.findById(newItem.id).populate('category', 'name');

      break;
    }
  }
  console.log(newItem);
  
  return newItem;
};
