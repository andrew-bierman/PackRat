import { ItemCategoryName } from '@prisma/client/edge';
import { prisma } from '../../prisma';
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
      category = await prisma.itemCategory.findFirst({
        where: {
          name: ItemCategoryName.Food,
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

      const existingWaterItem = await prisma.item.findFirst({
        where: {
          category: { id: category.id },
          packs: { some: { id: packId } },
        },
        select: {
          weight: true,
          id: true,
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
          packs: {
            connect: { id: packId },
          },
          category: {
            connect: { id: category.id },
          },
        },
      });

      break;
    }
  }

  const pack = await prisma.pack.update({
    where: { id: packId },
    data: {
      items: {
        connect: { id: newItem.id },
      },
    },
    include: {
      owners: true,
    },
  });

  const updatedItem = await prisma.item.update({
    where: { id: newItem.id },
    data: {
      owners: {
        connect: pack.owners.map((owner) => ({ id: owner.id })),
      },
    },
    include: {
      category: true,
    },
  });

  return { newItem: updatedItem, packId };
};
