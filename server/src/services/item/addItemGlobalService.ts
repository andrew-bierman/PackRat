import Item from '../../models/itemModel';
import Pack from '../../models/packModel';
import { ItemCategoryModel } from '../../models/itemCategory';
import { ItemCategoryEnum } from '../../utils/itemCategory';
import type { Document as MongooseDocument } from 'mongoose';
import type { ObjectId } from 'mongodb';
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

type ItemType = MongooseDocument & {
  createdAt: Date;
  updatedAt: Date;
  weight: number;
  name: string;
  quantity: number;
  unit: string;
  global: boolean;
  category?: ObjectId;
};

type CategoryType = MongooseDocument & {
  name: string;
  _id: ObjectId;
};

export const addItemGlobalService = async (
  name,
  weight,
  quantity,
  unit,
  type,
) => {
  let category: CategoryType | null = null;
  let newItem: ItemType | null = null;

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
        category: category?._id,
        global: true,
      });

      newItem = await Item.findById(newItem?.id).populate('category', 'name');

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
        category: category?._id,
        global: true,
      });

      newItem = await Item.findById(newItem?.id).populate('category', 'name');

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
        category: category?._id,
        global: true,
      });

      newItem = await Item.findById(newItem.id).populate('category', 'name');

      break;
    }
  }

  return newItem;
};
