/**
 * Adds a new pack service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} name - The name of the pack.
 * @param {string} owner_id - The ID of the pack owner.
 * @return {Object} An object containing the created pack.
 */

import { PrismaClient } from '@prisma/client/edge';

export const addPackService = async (prisma: PrismaClient, name, owner_id) => {
  const newPack = {
    name,
    owner_id,
    is_public: false,
    createdAt: new Date().toDateString(),
  };

  // Check if a pack with the same name already exists
  const existingPack = await prisma.pack.findFirst({
    where: {
      name,
    },
  });

  if (existingPack) {
    // A pack with the same name already exists
    throw new Error('A pack with the same name already exists');
  }

  // Create the new pack
  const createdPack = await prisma.pack.create({
    data: {
      ...newPack,
      owners: {
        connect: { id: owner_id },
      },
    },
  });

  return { createdPack };
};
