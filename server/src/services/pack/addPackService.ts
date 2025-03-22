import { type ExecutionContext } from 'hono';
import { Pack } from '../../drizzle/methods/pack';
import { VectorClient } from '../../vector/client';

/**
 * Adds a new pack service.
 * @param {string} name - The name of the pack.
 * @param {string} owner_id - The ID of the pack owner.
 * @param {boolean} is_public - Whether the pack is public or not.
 * @return {Object} An object containing the created pack.
 */
export const addPackService = async (
  name: string,
  owner_id: string,
  is_public: boolean,
  executionCtx: ExecutionContext,
) => {
  const packClass = new Pack();
  // Check if a pack with the same name already exists
  const existingPack = await packClass.findPack({ name });

  if (existingPack) {
    // A pack with the same name already exists
    throw new Error('A pack with the same name already exists');
  }
  // Create the new pack
  const createdPack = await packClass.create({ name, owner_id, is_public });

  executionCtx.waitUntil(
    VectorClient.instance.syncRecord({
      id: createdPack.id,
      content: name,
      metadata: {
        isPublic: createdPack.is_public ?? false,
        ownerId: owner_id,
      },
      namespace: 'packs',
    }),
  );

  return createdPack;
};
