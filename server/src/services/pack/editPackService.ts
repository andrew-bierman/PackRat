import { type ExecutionContext } from 'hono';
import { Pack } from '../../drizzle/methods/pack';
import { Queue } from '../../queue/client';
import { VectorClient } from '../../vector/client';

/**
 * Edits a pack in the service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId
 * @param {object} packData
 * @return {object}
 */
export const editPackService = async (
  packData: any,
  executionCtx: ExecutionContext,
) => {
  const packClass = new Pack();
  const { id, name, is_public } = packData;
  const pack = await packClass.findPack({ id });
  if (!pack) {
    throw new Error('Pack not found');
  }
  const updatedData = {
    id,
    is_public,
    name: name || pack.name,
  };
  const updatedPack = await packClass.update(updatedData);

  executionCtx.waitUntil(
    VectorClient.instance.syncRecord(
      {
        id: updatedData.id,
        content: name,
        metadata: {
          isPublic: updatedData.is_public,
          ownerId: pack.owner_id ?? '',
        },
        namespace: 'packs',
      },
      true,
    ),
  );

  return updatedPack;
};
