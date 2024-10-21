// import { prisma } from '../../prisma';

import { type ExecutionContext } from 'hono';
import { type InsertItemCategory } from '../../db/schema';
import { Item } from '../../drizzle/methods/Item';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { ItemCategory as categories } from '../../utils/itemCategory';
import { VectorClient } from '../../vector/client';
import { convertWeight, SMALLEST_WEIGHT_UNIT } from 'src/utils/convertWeight';

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
  executionCtx: ExecutionContext,
  id: string,
  packId: string,
  name?: string,
  weight?: number,
  unit?: string,
  quantity?: number,
  type?: 'Food' | 'Water' | 'Essentials',
) => {
  const itemClass = new Item();
  const item = await itemClass.findItem({ id });
  if (!item) {
    throw new Error(`Item with id ${id} not found`);
  }

  let category:
    | {
        id: string;
        name: 'Food' | 'Water' | 'Essentials';
        createdAt: string | null;
        updatedAt: string | null;
      }
    | null
    | undefined;

  // const itemClass = new Item();
  const itemCategoryClass = new ItemCategory();
  if (type && !categories.includes(type)) {
    throw new Error(`Category must be one of: ${categories.join(', ')}`);
  } else {
    category = await itemCategoryClass.findItemCategory({ name: type });
    if (!category) {
      category = await itemCategoryClass.create({
        name: type as 'Food' | 'Water' | 'Essentials',
      });
    }
  }
  const itemUnit = unit || item.unit;
  // const item = await itemClass.findItem({ id });
  const newItem = await itemClass.updatePackItem(
    id,
    {
      name: name || item.name,
      weight: convertWeight(
        Number(weight || item.weight),
        itemUnit as any,
        SMALLEST_WEIGHT_UNIT,
      ),
      unit: itemUnit,
      categoryId: category.id || item.categoryId,
    },
    packId,
    quantity,
  );

  executionCtx.waitUntil(
    VectorClient.instance.syncRecord(
      {
        id: newItem.id,
        content: name,
        metadata: {
          isPublic: newItem.global,
          ownerId: newItem.ownerId,
        },
        namespace: 'items',
      },
      true,
    ),
  );

  return newItem;
};
