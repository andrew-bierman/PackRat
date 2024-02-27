import { Pack } from '../../drizzle/methods/pack';
import { calculatePackScore } from '../../utils/scorePack';

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
    const pack = await packClass.findPack({
      id: packId,
      includeRelated: true,
    });

    if (!pack) {
      throw new Error('Pack not found');
    }
    const items = pack.itemPacks.map((itemPack) => itemPack.item);
    const packScore = calculatePackScore({ ...pack, items });

    const updatedPack = await packClass.update({
      id: pack.id,
      scores: packScore.scores,
      grades: packScore.grades,
    });

    return updatedPack;
  } catch (error) {
    throw new Error('Unable to score pack: ' + error.message);
  }
}
