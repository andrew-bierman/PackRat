import { prisma } from '../../prisma/index';
/**
 * Deletes a pack by its ID.
 *
 * @param {string} packId - The ID of the pack to be deleted.
 * @return {Object} - An object containing a message indicating the success of the deletion.
 */
export const deletePackService = async (packId) => {
  const pack = await prisma.pack.delete({
    where: {
      id: packId, // Replace 'id' with the actual primary key field in your model
    },
  });

  return { message: 'pack was deleted successfully' };
};
