import { type ExecutionContext } from 'hono';
import { type InsertItemCategory } from '../../db/schema';
import { Item } from '../../drizzle/methods/Item';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { ItemCategory as categories } from '../../utils/itemCategory';
import { VectorClient } from '../../vector/client';
import { convertWeight, SMALLEST_WEIGHT_UNIT } from 'src/utils/convertWeight';
import { DbClient } from 'src/db/client';
import { itemImage as itemImageTable } from '../../db/schema';
// import { prisma } from '../../prisma';

/**
 * Adds an item to the global service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} name - The name of the item.
 * @param {number} weight - The weight of the item.
 * @param {number} quantity - The quantity of the item.
 * @param {string} unit - The unit of measurement for the item.
 * @param {string} type - The category of the item.
 * @return {Promise<Object>} The newly created item.
 */
export const addItemGlobalService = async (
  name: string,
  weight: number,
  quantity: number,
  unit: string,
  type: 'Food' | 'Water' | 'Essentials',
  ownerId: string,
  executionCtx: ExecutionContext,
  image_urls?: string,
  sku?: string,
  productUrl?: string,
  description?: string,
  productDetails?: {
    [key: string]: string | number | boolean | null;
  },
  seller?: string,
) => {
  let category: InsertItemCategory | null;
  if (!categories.includes(type)) {
    throw new Error(`Category must be one of: ${categories.join(', ')}`);
  }
  const itemClass = new Item();
  const itemCategoryClass = new ItemCategory();
  category = (await itemCategoryClass.findItemCategory({ name: type })) || null;
  if (!category) {
    category = await itemCategoryClass.create({ name: type });
  }
  const newItem = await itemClass.create({
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
  });

  if (image_urls) {
    const urls = image_urls.split(',');
    for (const url of urls) {
      const newItemImage = {
        itemId: newItem.id,
        url,
      };
      await DbClient.instance.insert(itemImageTable).values(newItemImage).run();
    }
  }

  executionCtx.waitUntil(
    VectorClient.instance.syncRecord({
      id: newItem.id,
      content: name,
      namespace: 'items',
      metadata: {
        isPublic: newItem.global,
        ownerId,
      },
    }),
  );

  return newItem;
};
