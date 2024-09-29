import { type ExecutionContext } from 'hono';
import { type InsertItemCategory } from '../../db/schema';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { DbClient } from 'src/db/client';
import { item as ItemTable } from '../../db/schema';
import { convertWeight, SMALLEST_WEIGHT_UNIT } from 'src/utils/convertWeight';

export const bulkAddItemsGlobalService = async (
  items: Array<{
    name: string;
    weight: number;
    quantity: number;
    unit: string;
    type: 'Food' | 'Water' | 'Essentials';
    ownerId: string;
  }>,
  executionCtx: ExecutionContext,
) => {
  const categories = ['Food', 'Water', 'Essentials'];

  const itemCategoryClass = new ItemCategory();
  const insertedItems = [];

  for (const itemData of items) {
    const { name, weight, quantity, unit, type, ownerId } = itemData;
    if (!categories.includes(type)) {
      throw new Error(`Category must be one of: ${categories.join(', ')}`);
    }

    let category: InsertItemCategory | null;
    category =
      (await itemCategoryClass.findItemCategory({ name: type })) || null;
    if (!category) {
      category = await itemCategoryClass.create({ name: type });
    }

    const newItem = {
      name,
      weight: convertWeight(Number(weight), unit as any, SMALLEST_WEIGHT_UNIT),
      quantity,
      unit,
      categoryId: category.id,
      global: true,
      ownerId,
    };

    const item = await DbClient.instance
      .insert(ItemTable)
      .values(newItem)
      .returning()
      .get();

    insertedItems.push(item);
  }

  return insertedItems;
};
