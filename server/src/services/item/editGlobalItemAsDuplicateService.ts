import { PrismaClient } from '@prisma/client/edge';
// import { prisma } from '../../prisma';
/**
 * Edits a global item by creating a duplicate item in a specific pack.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be edited.
 * @param {string} packId - The ID of the pack where the duplicate item will be created.
 * @param {string} name - The name of the duplicate item.
 * @param {number} weight - The weight of the duplicate item.
 * @param {number} quantity - The quantity of the duplicate item.
 * @param {string} unit - The unit of measurement for the duplicate item.
 * @param {string} type - The type/category of the duplicate item.
 * @return {Promise<object>} The newly created duplicate item.
 */
export const editGlobalItemAsDuplicateService = async (
  prisma: PrismaClient,
  itemId,
  packId,
  name,
  weight,
  quantity,
  unit,
  type,
) => {
  const category = await prisma.itemCategory.findFirst({
    where: {
      name: type,
    },
  });

  let newItem = await prisma.item.create({
    data: {
      name,
      weight,
      unit,
      quantity,
      global: false,
      categoryDocument: {
        connect: { id: category.id },
      },
      packDocuments: {
        connect: { id: packId },
      },
    },
  });

  newItem = await prisma.item.findUnique({
    where: {
      id: newItem.id,
    },
    include: {
      categoryDocument: true,
    },
  });

  await prisma.pack.update({
    where: {
      id: packId,
    },
    data: {
      itemDocuments: {
        connect: { id: newItem.id },
        disconnect: [{ id: itemId }, { id: packId }],
      },
    },
  });

  return newItem;
};
