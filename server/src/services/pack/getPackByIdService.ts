import { Pack } from '../../drizzle/methods/pack';

export const getPackByIdService = async (packId: string) => {
  try {
    const packClass = new Pack();
    const pack = await packClass.findPack({ id: packId });
    const packData = {
      ...pack,
      scores: JSON.parse(pack.scores as string),
      grades: JSON.parse(pack.grades as string),
      total_weight: packClass.computeTotalWeight(pack),
      favorites_count: packClass.computeFavouritesCount(pack),
      total_score: packClass.computeTotalScores(pack),
      items: pack.itemPacks.map((itemPack) => itemPack.item),
    };
    return packData;
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    throw error;
  }
};
