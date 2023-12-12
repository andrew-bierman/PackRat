import type { Item, Pack, PacksScores, User } from '@prisma/client/edge';
import { convertWeight } from '../../utils/convertWeight';

// Define field types that are needed for computing the new field
type TotalWeightNeeds = {
  itemDocuments: Item[];
};

// Define the computed field type
type WithTotalWeight<T> = T & {
  total_weight: number;
};

// Define the field computation function
const computeTotalWeight = <Pack extends TotalWeightNeeds>(
  pack: Pack,
): WithTotalWeight<Pack> => {
  if (pack.itemDocuments && pack.itemDocuments.length > 0) {
    const totalWeight = pack.itemDocuments.reduce(
      (total, itemDocument: any) => {
        // Convert each item's weight to grams
        const weightInGrams = convertWeight(
          itemDocument.weight,
          itemDocument.unit,
          'g',
        );
        return total + weightInGrams * itemDocument.quantity;
      },
      0,
    );
    return {
      ...pack,
      total_weight: totalWeight,
    };
  } else {
    return {
      ...pack,
      total_weight: 0,
    };
  }
};

// Define field types that are needed for computing the new field
type FavouritesCountNeeds = {
  favorited_by: User[];
};

// Define the computed field type
type WithFavouritesCount<T> = T & {
  favorites_count: number;
};

// Define the field computation function
const computeFavouritesCount = <Pack extends FavouritesCountNeeds>(
  pack: Pack,
): WithFavouritesCount<Pack> => ({
  ...pack,
  favorites_count: pack.favorited_by?.length ?? 0,
});

// Define field types that are needed for computing the new field
type TotalScoreNeeds = {
  scores: PacksScores;
};

// Define the computed field type
type WithTotalScores<T> = T & {
  total_score: number;
};

// Define the field computation function
const computeTotalScores = <Pack extends TotalScoreNeeds>(
  pack: Pack,
): WithTotalScores<Pack> => {
  if (!pack.scores) return { ...pack, total_score: 0 };

  const scoresArray: number[] = Object.values(pack.scores);
  const sum: number = scoresArray.reduce(
    (total: number, score: number) => total + score,
    0,
  );
  const average: number = scoresArray.length > 0 ? sum / scoresArray.length : 0;

  return { ...pack, total_score: Math.round(average * 100) / 100 };
};

export { computeTotalWeight, computeFavouritesCount, computeTotalScores };
