import { type ExecutionContext } from 'hono';
import * as validator from '@packrat/validations';
import {
  Item,
  ITEM_TABLE_NAME,
  type InsertItemCategory,
} from '../../db/schema';
import { Item as ItemClass } from '../../drizzle/methods/Item';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { ItemCategory as categories } from '../../utils/itemCategory';
import { VectorClient } from '../../vector/client';
import { convertWeight, SMALLEST_WEIGHT_UNIT } from 'src/utils/convertWeight';
import { summarizeItem } from 'src/utils/item';

type ItemWithCategory = Item & { category?: InsertItemCategory };

/**
 * Adds an item to the global service.
 * @param {Object} item - The data for the new item.
 * @param {ExecutionContext} executionCtx - Then vector database execution context
 * @return {Promise<Object>} The newly created item.
 */
export const addItemGlobalService = async (
  item: validator.AddItemGlobalType,
  executionCtx?: ExecutionContext,
): Promise<ItemWithCategory> => {
  let category: InsertItemCategory | null;
  if (!categories.includes(item.type)) {
    const error = new Error(
      `[${item.sku}#${item.name}]: Category must be one of: ${categories.join(', ')}`,
    );
    throw error;
  }

  const itemClass = new ItemClass();
  const itemCategoryClass = new ItemCategory();
  category =
    (await itemCategoryClass.findItemCategory({ name: item.type })) || null;
  if (!category) {
    category = await itemCategoryClass.create({ name: item.type });
  }

  const newItem = (await itemClass.create({
    name: item.name,
    weight: convertWeight(
      Number(item.weight),
      item.unit as any,
      SMALLEST_WEIGHT_UNIT,
    ),
    unit: item.unit,
    categoryId: category.id,
    global: true,
    ownerId: item.ownerId,
    sku: item.sku,
    productUrl: item.productUrl,
    description: item.description,
    productDetails: item.productDetails,
    seller: item.seller,
  })) as ItemWithCategory;

  if (item.image_urls) {
    const urls = item.image_urls.split(',');
    for (const url of urls) {
      await itemClass.insertImage(newItem.id, url);
    }
  }

  newItem.category = category;

  if (executionCtx) {
    executionCtx.waitUntil(
      VectorClient.instance.syncRecord({
        id: newItem.id,
        content: summarizeItem(newItem),
        namespace: ITEM_TABLE_NAME,
        metadata: {
          isPublic: newItem.global,
          ownerId: newItem.ownerId,
        },
      }),
    );
  }

  return newItem;
};
