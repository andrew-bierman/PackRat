import { Pack } from '../../drizzle/methods/pack';

/**
 * Deletes a pack by its ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack to be deleted.
 * @return {Object} - An object containing a message indicating the success of the deletion.
 */
export const deletePackService = async (packId: string): Promise<object> => {
  const packClass = new Pack();
  await packClass.delete(packId);
  return { message: 'Pack was deleted successfully' };
};
