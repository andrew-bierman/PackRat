import { type ExecutionContext } from 'hono';
import { type InsertItemCategory } from '../../db/schema';
import { Item } from '../../drizzle/methods/Item';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { ItemCategory as categories } from '../../utils/itemCategory';
import { VectorClient } from '../../vector/client';

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
  const itemClass = new Item();
  const itemCategoryClass = new ItemCategory();
  const insertedItems = [];

  for (const itemData of items) {
    const { name, weight, quantity, unit, type, ownerId } = itemData;

    let category: InsertItemCategory | null;
    if (!categories.includes(type)) {
      throw new Error(`Category must be one of: ${categories.join(', ')}`);
    }

    category =
      (await itemCategoryClass.findItemCategory({ name: type })) || null;
    if (!category) {
      category = await itemCategoryClass.create({ name: type });
    }

    const newItem = {
      name,
      weight,
      quantity,
      unit,
      categoryId: category.id,
      global: true,
      ownerId,
    };

    insertedItems.push(newItem);
  }

  const createdItems = await itemClass.createBulk(insertedItems);

  for (const item of createdItems) {
    executionCtx.waitUntil(
      VectorClient.instance.syncRecord({
        id: item.id,
        content: item.name,
        namespace: 'items',
        metadata: {
          isPublic: item.global,
        },
      }),
    );
  }

  return createdItems;
};
