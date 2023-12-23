import { ItemCategoryName, PrismaClient } from '@prisma/client/edge';
// import { prisma } from '../../prisma';
import { ItemCategoryEnum } from '../../utils/itemCategory';
import { Item } from '../../drizzle/methods/Item';
import { item as itemTable } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
/**
 * Generates a new item and adds it to a pack based on the given parameters.
 * @param {PrismaClient} prisma - Prisma client.
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
  prisma: PrismaClient,
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
  switch (type) {
    case ItemCategoryEnum.FOOD: {
      category = await prisma.itemCategory.findFirst({
        where: {
          name: ItemCategoryName.Food,
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
      category = await prisma.itemCategory.findFirst({
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
      category = await prisma.itemCategory.findFirst({
        where: {
          name: ItemCategoryEnum.ESSENTIALS,
        },
      });

      newItem = await prisma.item.create({
        data: {
          name,
          weight,
          quantity,
          unit,
          packDocuments: {
            connect: { id: packId },
          },
          categoryDocument: {
            connect: { id: category.id },
          },
          type,
        },
      });

      break;
    }
  }

  const pack = await prisma.pack.update({
    where: { id: packId },
    data: {
      itemDocuments: {
        connect: { id: newItem.id },
      },
    },
  });

  const updatedItem = await item.update({
    owners: {
      push: pack.owners.map((ownerId) => ownerId),
    },
  },newItem.id, and(eq(itemTable.id, newItem.id)));

  return { newItem: updatedItem, packId };
};
