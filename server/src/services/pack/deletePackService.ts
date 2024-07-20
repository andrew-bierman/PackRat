import { type ExecutionContext } from 'hono';
import { Pack } from '../../drizzle/methods/pack';
import { VectorClient } from '../../vector/client';

/**
 * Deletes a pack by its ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack to be deleted.
 * @return {Object} - An object containing a message indicating the success of the deletion.
 */
export const deletePackService = async (
  packId: string,
  executionCtx: ExecutionContext,
): Promise<object> => {
  const packClass = new Pack();
  await packClass.delete(packId);

  executionCtx.waitUntil(VectorClient.instance.delete(packId));

  return { message: 'Pack was deleted successfully' };
};
