// import { prisma } from '../../prisma';
import { ItemCategoryEnum } from '../../utils/itemCategory';
import { Item } from '../../drizzle/methods/Item';
import { item as itemTable } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { ItemCategory } from '../../drizzle/methods/itemcategory';
import { Pack } from '../../drizzle/methods/Pack';
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
  name,
  weight,
  quantity,
  unit,
  packId,
  type,
  ownerId,
) => {
  let category = null;
  let newItem = null;
  const item = new Item();
  const packClass = new Pack();
  const itemCategory = new ItemCategory();
  switch (type) {
    case ItemCategoryEnum.FOOD: {
      category = await itemCategory.findUniqueItem({
        where: {
          name: "Food",
        },
      });
      newItem = await item.create({
        name,
        weight,
        quantity,
        unit,
        packDocuments: {
          id: packId,
        },
        categoryDocument: {
          id: category.id
        },
      });
      break;
    }
    case ItemCategoryEnum.WATER: {
      category = await itemCategory.findUniqueItem({
        where: {
          name: 'Water',
        },
      });

      const existingWaterItem: any = await item.findUniqueItem({
        where: {
          category: category.id,
          packs: { has: packId },
        },
        columns: {
          weight: true,
          id: true,
        },
      });

      if (existingWaterItem) {
        existingWaterItem.weight += Number(weight);
        newItem = await item.update({
          weight: existingWaterItem.weight,
        }, existingWaterItem.id);
      } else {
        newItem = await item.create({
          name,
          weight,
          quantity: 1,
          unit,
          packDocuments: {
            id: packId,
          },
          categoryDocument: {
            id: category.id,
          },
        });
      }
      break;
    }
    default: {
      category = await itemCategory.findUniqueItem({
        where: {
          name: ItemCategoryEnum.ESSENTIALS,
        },
      });

      newItem = await item.create({
        data: {
          name,
          weight,
          quantity,
          unit,
          packDocuments: packId,
          categoryDocument: category.id,
          type,
        },
      });

      break;
    }
  }

  const pack = await packClass.update({
    itemDocuments: newItem.id,
  }, packId);

  const updatedItem = await item.update({
    owners: {
      push: pack.owners.map((ownerId) => ownerId),
    },
  }, newItem.id, and(eq(itemTable.id, newItem.id)));

  return { newItem: updatedItem, packId };
};
