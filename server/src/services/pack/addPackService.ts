import { Pack } from '../../drizzle/methods/pack';
import { VectorClient } from '../../vector/client';

/**
 * Adds a new pack service.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} name - The name of the pack.
 * @param {string} owner_id - The ID of the pack owner.
 * @return {Object} An object containing the created pack.
 */

export const addPackService = async (
  name: string,
  owner_id: string,
  is_public: boolean,
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

  // Trigger vector sync
  await VectorClient.syncRecord({
    id: createdPack.id,
    content: name,
  });

  return createdPack;
};
