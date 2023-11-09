import type { Item, Pack, PacksScores, User } from '@prisma/client/edge';
import { convertWeight } from '../../utils/convertWeight';


// Define field types that are needed for computing the new field
type TotalWeightNeeds = {
  items: Item[]
}

// Define the computed field type
type WithTotalWeight<T> = T & {
  total_weight: number
}

// Define the field computation function
const computeTotalWeight = <Pack extends TotalWeightNeeds>(pack: Pack): WithTotalWeight<Pack> => {
  if (pack.items && pack.items.length > 0) {
    const totalWeight = pack.items.reduce((total, item: any) => {
      // Convert each item's weight to grams
      const weightInGrams = convertWeight(item.weight, item.unit, 'g');
      return total + weightInGrams * item.quantity;
    }, 0);
    return {
      ...pack,
      total_weight: totalWeight
    }
  } else {
    return {
      ...pack,
      total_weight: 0
    }
  }
}


// Define field types that are needed for computing the new field
type FavouritesCountNeeds = {
  favorited_by: User[]
}

// Define the computed field type
type WithFavouritesCount<T> = T & {
  favorites_count: number
}

// Define the field computation function
const computeFavouritesCount = <Pack extends FavouritesCountNeeds>(pack: Pack): WithFavouritesCount<Pack> => ({...pack, favorites_count: pack.favorited_by.length})


// Define field types that are needed for computing the new field
type TotalScoreNeeds = {
  scores: PacksScores
}

// Define the computed field type
type WithTotalScores<T> = T & {
  total_score: number
}

// Define the field computation function
const computeTotalScores = <Pack extends TotalScoreNeeds>(pack: Pack): WithTotalScores<Pack> => {
  if(!pack.scores) return {...pack, total_score: 0}
  
  const scoresArray: number[] = Object.values(pack.scores);
  const sum: number = scoresArray.reduce(
    (total: number, score: number) => total + score,
    0,
  );
  const average: number = scoresArray.length > 0 ? sum / scoresArray.length : 0;

  return {...pack, total_score: Math.round(average * 100) / 100}
}


export {
  computeTotalWeight,
  computeFavouritesCount,
  computeTotalScores
}