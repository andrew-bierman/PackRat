import { type ExecutionContext } from 'hono';
import * as validator from '@packrat/validations';
import { Item as ItemClass } from '../../drizzle/methods/Item';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { ItemOwners } from '../../drizzle/methods/ItemOwners';
import { ItemCategory as categories } from '../../utils/itemCategory';
import {
  Item,
  ITEM_TABLE_NAME,
  type InsertItemCategory,
} from '../../db/schema';
import { VectorClient } from '../../vector/client';
import { convertWeight, SMALLEST_WEIGHT_UNIT } from 'src/utils/convertWeight';
import { summarizeItem } from 'src/utils/item';

/**
 * Generates a new item and adds it to a pack based on the given parameters.
 * @param {string} name - The name of the item.
 * @param {number} weight - The weight of the item.
 * @param {number} quantity - The quantity of the item.
 * @param {string} unit - The unit of measurement for the item.
 * @param {string} packId - The ID of the pack to add the item to.
 * @param {string} type - The category type of the item.
 * @param {string} ownerId - The ID of the owner of the item.
 * @return {object} An object containing the newly created item and the pack ID.
 */
export const addItemService = async (
  name: string,
  weight: number,
  quantity: number,
  unit: string,
  packId: string,
  type: 'Food' | 'Water' | 'Essentials',
  ownerId: string,
  executionCtx: ExecutionContext,
) => {
  let category: InsertItemCategory | null;
  if (!categories.includes(type)) {
    throw new Error(`Category must be one of: ${categories.join(', ')}`);
  }
  const itemCategoryClass = new ItemCategory();
  const itemClass = new ItemClass();
  const itemOwnersClass = new ItemOwners();
  category = (await itemCategoryClass.findItemCategory({ name: type })) || null;
  if (!category) {
    category = await itemCategoryClass.create({ name: type });
  }
  const item = await itemClass.createPackItem(
    {
      name,
      weight: convertWeight(Number(weight), unit as any, SMALLEST_WEIGHT_UNIT),
      unit,
      categoryId: category.id,
      ownerId,
    },
    packId,
    quantity,
  );

  // await Pack.updateOne({ _id: packId }, { $addToSet: { items: newItem._id } });
  await itemOwnersClass.create({ itemId: item.id, ownerId });
  // const pack = await packClass.update(
  //   {
  //     itemDocuments: newItem.id,
  //   },
  //   packId,
  // );

  // const updatedItem = await item.update(
  //   {
  //     owners: {
  //       push: pack.owners.map((ownerId) => ownerId),
  //     },
  //   },
  //   newItem.id,
  //   and(eq(itemTable.id, newItem.id)),
  // );

  // return { newItem: updatedItem, packId };

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

  return item;
};

/**
 * Creates a new item.
 * @param {Object} item - The data for the new item.
 * @return {object} An object containing the newly created item
 */
export const addNewItemService = async (
  item: typeof validator.addNewItemGlobal._type,
  ownerId: string,
): Promise<Item & { category: InsertItemCategory }> => {
  let category: InsertItemCategory | null;
  if (!categories.includes(item.category)) {
    const error = new Error(
      `[${item.sku}#${item.name}]: Category must be one of: ${categories.join(', ')}`,
    );
    throw error;
  }

  const itemClass = new ItemClass();
  const itemCategoryClass = new ItemCategory();
  category =
    (await itemCategoryClass.findItemCategory({ name: item.category })) || null;
  if (!category) {
    category = await itemCategoryClass.create({ name: item.category });
  }

  const newItem = await itemClass.create({
    name: item.name,
    weight: convertWeight(
      Number(item.weight),
      item.unit as any,
      SMALLEST_WEIGHT_UNIT,
    ),
    unit: item.unit,
    categoryId: category.id,
    global: true,
    ownerId,
    sku: item.sku,
    productUrl: item.productUrl,
    description: item.description,
    productDetails: item.productDetails,
    seller: item.seller,
  });

  if (item.imageUrls) {
    const urls = item.imageUrls.split(',');
    for (const url of urls) {
      await itemClass.insertImage(newItem.id, url);
    }
  }

  return { ...newItem, category };
};

/**
 * Adds a list of items to the global inventory and indexes them in the vector database.
 * @param {Object} bulkPram: the config parameter
 * @param {Object} bulkPram.items - The list of items to add.
 * @param {string} bulkPram.ownerId - The owner of all items
 * @param {ExecutionContext} bulkParam.onItemCreated - A callback function to be called when an item is created.
 * @param {Function} bulkParam.onItemCreated - A callback function to be called when an item is created.
 */
export const bulkAddNewItemsService = async (bulkParam: {
  items: Iterable<
    typeof validator.addNewItemGlobal._type & { ownerId: string }
  >;
  executionCtx: ExecutionContext;
  onItemCreated?: (
    item: Awaited<ReturnType<typeof addNewItemService>>,
    bulkIndex: number,
  ) => void;
  onItemCreationError?: (error: Error, bulkIndex: number) => void;
}): Promise<Array<Awaited<ReturnType<typeof addNewItemService>>>> => {
  const { items, executionCtx, onItemCreated, onItemCreationError } = bulkParam;
  const createdItems: Array<Awaited<ReturnType<typeof addNewItemService>>> = [];
  const vectorData = [];

  let idx = -1;
  for (const item of items) {
    idx += 1;
    try {
      const createdItem = await addNewItemService(item, item.ownerId);
      if (onItemCreated) {
        onItemCreated(createdItem, idx);
      }
      createdItems.push(createdItem);

      vectorData.push({
        id: createdItem.id,
        content: summarizeItem(createdItem),
        namespace: ITEM_TABLE_NAME,
        metadata: {
          isPublic: createdItem.global,
          ownerId: createdItem.ownerId,
        },
      });
    } catch (error) {
      if (onItemCreationError) {
        onItemCreationError(error as Error, idx);
      }
    }
  }

  executionCtx.waitUntil(VectorClient.instance.syncRecords(vectorData));
  return createdItems;
};
