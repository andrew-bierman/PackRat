import { Pack } from '../../drizzle/methods/pack';
import { calculatePackScore } from '../../utils/scorePack';

interface PackProperties {
  id: string;
  name: string;
  owner_id: string;
  is_public: boolean;
  grades: Object;
  scores: Object;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface ItemPack {
  item: any;
}

interface PackWithItemPacks extends PackProperties {
  itemPacks: ItemPack[];
}

/**
 * Scores a pack service based on the given packId.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack to be scored.
 * @return {Promise<Pack>} The updated pack object with scores and grades.
 * @throws {Error} If unable to score the pack.
 */
export async function scorePackService(packId: string) {
  try {
    const packClass = new Pack();
    const pack = (await packClass.findPack({
      id: packId,
      includeRelated: true,
    })) as unknown as PackWithItemPacks;

    if (!pack) {
      throw new Error('Pack not found');
    }
    const items = pack.itemPacks.map((itemPack) => itemPack.item);
    const packScore = calculatePackScore({ ...pack, items });

    const updatedPack = await packClass.update({
      id: pack.id,
      scores: packScore?.scores || null,
      grades: packScore?.grades || null,
    });

    return updatedPack;
  } catch (error) {
    throw new Error('Unable to score pack: ' + error.message);
  }
}
