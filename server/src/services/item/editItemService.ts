// import { prisma } from '../../prisma';

import { type InsertItemCategory } from '../../db/schema';
import { Item } from '../../drizzle/methods/Item';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { ItemCategory as categories } from '../../utils/itemCategory';

/**
 * Edit an item in the service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} id - the ID of the item to be edited
 * @param {string} name - the new name of the item
 * @param {number} weight - the new weight of the item
 * @param {string} unit - the new unit of the item
 * @param {number} quantity - the new quantity of the item
 * @param {string} type - the new type of the item
 * @return {Promise<object>} - the edited item
 */
export const editItemService = async (
  id: string,
  name?: string,
  weight?: number,
  unit?: string,
  quantity?: number,
  type?: 'Food' | 'Water' | 'Essentials',
) => {
  let category: InsertItemCategory | null;
  const itemClass = new Item();
  const itemCategoryClass = new ItemCategory();
  if (type && !categories.includes(type)) {
    throw new Error(`Category must be one of: ${categories.join(', ')}`);
  } else {
    category = await itemCategoryClass.findItemCategory({ name: type });
    if (!category) {
      category = await itemCategoryClass.create({ name: type });
    }
  }
  const item = await itemClass.findItem({ id });
  const newItem = await itemClass.update(id, {
    name: name || item.name,
    weight: weight || item.weight,
    unit: unit || item.unit,
    quantity: quantity || item.quantity,
    categoryId: category.id || item.categoryId,
  });

  return newItem;
};
