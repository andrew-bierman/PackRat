import { prisma } from "../../prisma/index";
import { ItemCategoryEnum } from '../../utils/itemCategory';

/**
 * Generates a new item and adds it to a pack based on the given parameters.
 *
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

  switch (type) {
    case ItemCategoryEnum.FOOD: {
      category = await prisma.itemcategories.findFirst({
        where: {
          name: ItemCategoryEnum.FOOD,
        },
      });

      newItem = await prisma.item.create({
        data: {
          name,
          weight,
          quantity,
          unit,
          packs: {
            connect: { id: packId },
          },
          category: {
            connect: { id: category.id },
          },
        } as any,
      });

      break;
    }
    case ItemCategoryEnum.WATER: {
      category = await prisma.itemcategories.findFirst({
        where: {
          name: ItemCategoryEnum.WATER,
        },
      });

      const existingWaterItem :any= await prisma.item.findFirst({
        where: {
          category: { id: category.id } as any,
          packs: { some: { id: packId } } as any,
        },
      });

      if (existingWaterItem) {
        existingWaterItem.weight += Number(weight);
        newItem = await prisma.item.update({
          where: { id: existingWaterItem.id },
          data: {
            weight: existingWaterItem.weight,
          },
        });
      } else {
        newItem = await prisma.item.create({
          data: {
            name,
            weight,
            quantity: 1,
            unit,
            packs: {
              connect: { id: packId },
            },
            category: {
              connect: { id: category.id },
            },
          } as any,
        });
      }

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
          packs: {
            connect: { id: packId },
          },
          category: {
            connect: { id: category.id },
          },
        } as any,
      });

      break;
    }
  }

  await prisma.pack.update({
    where: { id: packId },
    data: {
      items: {
        connect: { id: newItem.id },
      } as any,
    },
  });

  const updatedItem = await prisma.item.update({
    where: { id: newItem.id },
    data: {
      owners: {
        connect: { id: ownerId },
      } as any,
    },
    include: {
      category: true,
    } as never,
  });

  return { newItem: updatedItem, packId };
};
