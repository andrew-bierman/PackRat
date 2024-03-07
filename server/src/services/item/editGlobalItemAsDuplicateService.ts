import type { Document as MongooseDocument } from 'mongoose';
import Item from '../../models/itemModel';
import Pack from '../../models/packModel';
import { ItemCategoryModel } from '../../models/itemCategory';
import type { ObjectId } from 'mongodb';

/**
 * Edits a global item by creating a duplicate item in a specific pack.
 *
 * @param {string} itemId - The ID of the item to be edited.
 * @param {string} packId - The ID of the pack where the duplicate item will be created.
 * @param {string} name - The name of the duplicate item.
 * @param {number} weight - The weight of the duplicate item.
 * @param {number} quantity - The quantity of the duplicate item.
 * @param {string} unit - The unit of measurement for the duplicate item.
 * @param {string} type - The type/category of the duplicate item.
 * @return {Promise<object>} The newly created duplicate item.
 */

type ItemType = MongooseDocument & {
  createdAt: Date;
  updatedAt: Date;
  weight: number;
  name: string;
  packs: ObjectId[];
  quantity: number;
  unit: string;
  owners: ObjectId[];
  global: boolean;
  category?: ObjectId;
};

export const editGlobalItemAsDuplicateService = async (
  itemId: string,
  packId: string,
  name: string,
  weight: number,
  quantity: number,
  unit: string,
  type: string,
): Promise<ItemType | null> => {
  const category = await ItemCategoryModel.findOne({
    name: type,
  });

  if (!category) {
    throw new Error(`No category found with: ${type}`);
  }

  let newItem: ItemType | null = await Item.create({
    name,
    weight,
    unit,
    quantity,
    category: category._id,
    global: false,
    packs: [packId],
  });

  newItem = await Item.findById(newItem?._id).populate('category', 'name');

  await Pack.updateOne({ _id: packId }, { $addToSet: { items: newItem?._id } });

  await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });

  await Item.updateOne(
    {
      _id: itemId,
    },
    {
      $pull: {
        packs: packId,
      },
    },
  );

  return newItem;
};
