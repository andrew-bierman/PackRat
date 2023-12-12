import { PrismaClient } from '@prisma/client/edge';

/**
 * Deletes a pack by its ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack to be deleted.
 * @return {Object} - An object containing a message indicating the success of the deletion.
 */
export const deletePackService = async (prisma: PrismaClient, packId) => {
  await prisma.pack.delete({
    where: {
      id: packId, // Replace 'id' with the actual primary key field in your model
    },
  });

  return { message: 'pack was deleted successfully' };
};
