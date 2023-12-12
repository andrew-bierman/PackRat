import { ItemCategoryEnum } from '../../utils/itemCategory';
// import { prisma } from '../../prisma';
import { ItemCategoryName, PrismaClient } from '@prisma/client/edge';

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
  prisma: PrismaClient,
  name,
  weight,
  quantity,
  unit,
  type,
) => {
  let category = null;
  let newItem = null;

  switch (type) {
    case ItemCategoryEnum.FOOD: {
      const category = await prisma.itemCategory.findFirst({
        where: {
          name: ItemCategoryName.Food,
        },
      });

      let newItem = await prisma.item.create({
        data: {
          name,
          weight,
          quantity,
          unit,
          categoryDocument: {
            connect: { id: category.id },
          },
          global: true,
        },
      });
      newItem = await prisma.item.findUnique({
        where: {
          id: newItem.id,
        },
        include: {
          categoryDocument: {
            select: {
              name: true,
            },
          },
        },
      });

      break;
    }
    case ItemCategoryEnum.WATER: {
      const category = await prisma.itemCategory.findFirst({
        where: {
          name: ItemCategoryName.Water,
        },
      });
      newItem = await prisma.item.create({
        data: {
          name,
          weight,
          quantity: 1,
          unit,
          categoryDocument: {
            connect: { id: category.id },
          },
          global: true,
        },
      });

      newItem = await prisma.item.findUnique({
        where: {
          id: newItem.id,
        },
        include: {
          categoryDocument: {
            select: {
              name: true,
            },
          },
        },
      });

      break;
    }
    default: {
      category = await prisma.itemCategory.findFirst({
        where: {
          name: ItemCategoryName.Essentials,
        },
      });

      newItem = await prisma.item.create({
        data: {
          name,
          weight,
          quantity,
          unit,
          categoryDocument: {
            connect: {
              id: category.id,
            },
          },
          global: true,
        },
      });
      newItem = await prisma.item.findUnique({
        where: {
          id: newItem.id,
        },
        include: {
          categoryDocument: {
            select: {
              name: true,
            },
          },
        },
      });
      break;
    }
  }

  return newItem;
};
