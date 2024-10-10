import { type ExecutionContext } from 'hono';
import { type InsertItemCategory } from '../../db/schema';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { DbClient } from 'src/db/client';
import { item as ItemTable, itemImage as itemImageTable } from '../../db/schema';
import { convertWeight, SMALLEST_WEIGHT_UNIT } from 'src/utils/convertWeight';
import { eq } from 'drizzle-orm';
import { VectorClient } from 'src/vector/client';

export const bulkAddItemsGlobalService = async (
  items: Array<{
    name: string;
    weight: number;
    quantity: number;
    unit: string;
    type: 'Food' | 'Water' | 'Essentials';
    ownerId: string;
    image_urls?: string;
    sku?: string;
    productUrl?: string;
    description?: string;
    productDetails?: {
      [key: string]: string | number | boolean | null;
    };
    seller?: string;
  }>,
  executionCtx: ExecutionContext,
) => {
  const categories = ['Food', 'Water', 'Essentials'];

  const itemCategoryClass = new ItemCategory();
  const insertedItems = [];

  for (const itemData of items) {
    const {
      name,
      weight,
      quantity,
      unit,
      type,
      ownerId,
      image_urls,
      sku,
      productUrl,
      description,
      productDetails,
      seller,
    } = itemData;
    if (!categories.includes(type)) {
      throw new Error(`Category must be one of: ${categories.join(', ')}`);
    }

    let category: InsertItemCategory | null;
    category =
      (await itemCategoryClass.findItemCategory({ name: type })) || null;
    if (!category) {
      category = await itemCategoryClass.create({ name: type });
    }

    // Check if item with the same name already exists
    const existingItem = await DbClient.instance
      .select()
      .from(ItemTable)
      .where(eq(ItemTable.name, name))
      .get();

    if (existingItem) {
      continue;
    }

    const newItem = {
      name,
      weight: convertWeight(Number(weight), unit as any, SMALLEST_WEIGHT_UNIT),
      quantity,
      unit,
      categoryId: category.id,
      global: true,
      ownerId,
      sku,
      productUrl,
      description,
      productDetails,
      seller,
    };

    const item = await DbClient.instance
      .insert(ItemTable)
      .values(newItem)
      .returning()
      .get();

    executionCtx.waitUntil(
      VectorClient.instance.syncRecord({
        id: item.id,
        content: name,
        namespace: 'items',
        metadata: {
          isPublic: item.global,
          ownerId,
        },
      }),
    );

    if (image_urls) {
      const urls = image_urls.split(',');
      for (const url of urls) {
        const newItemImage = {
          itemId: item.id,
          url,
        };
        await DbClient.instance
          .insert(itemImageTable)
          .values(newItemImage)
          .run();
      }
      console.log('Added image urls for item:', item.id);
    }

    insertedItems.push(item);
  }

  return insertedItems;
};
