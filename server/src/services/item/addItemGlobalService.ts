import { never } from 'zod';
import { ItemCategoryEnum } from '../../utils/itemCategory';
import { prisma } from '../../prisma/index';

/**
 * Adds an item to the global service.
 *
 * @param {string} name - The name of the item.
 * @param {number} weight - The weight of the item.
 * @param {number} quantity - The quantity of the item.
 * @param {string} unit - The unit of measurement for the item.
 * @param {string} type - The category of the item.
 * @return {Promise<Object>} The newly created item.
 */
export const addItemGlobalService = async (
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
      const category = await prisma.itemcategories.findFirst({
        where: {
          name: ItemCategoryEnum.FOOD,
        },
      });

      let newItem = await prisma.item.create({
        data: {
          name,
          weight,
          quantity,
          unit,
          category: {
            connect: { id: category.id },
          },
          global: true,
        } as any,
      });
      newItem = await prisma.item.findUnique({
        where: {
          id: newItem.id,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        } as never,
      });

      break;
    }
    case ItemCategoryEnum.WATER: {
      const category = await prisma.itemcategories.findFirst({
        where: {
          name: ItemCategoryEnum.WATER,
        },
      });
      newItem = await prisma.item.create({
        data: {
          name,
          weight,
          quantity: 1,
          unit,
          categoryId: category.id, // Assuming 'category' is the related model
          global: true,
        } as any,
      });

      newItem = await prisma.item.findUnique({
        where: {
          id: newItem.id,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        } as never,
      });

      break;
    }
    default: {
      category = await prisma.itemcategories.findFirst({
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
          categoryId: category.id,
          global: true,
        } as any,
      });
      newItem = await prisma.item.findUnique({
        where: {
          id: newItem.id,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        } as never,
      });
      break;
    }
  }

  return newItem;
};
