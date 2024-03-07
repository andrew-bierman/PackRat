import Pack from '../../models/packModel';
import { computeTotalWeightInGrams } from '../../utils/convertWeight';

const SORT_OPTIONS = {
  Favorite: { favorites_count: -1 },
  Lightest: { total_weight: 1 },
  Heaviest: { total_weight: -1 },
  'Most Items': { items_count: -1 },
  'Fewest Items': { items_count: 1 },
  Oldest: { createdAt: 1 },
  'Most Recent': { updatedAt: -1 },
  'Highest Score': { 'scores.totalScore': -1 },
  'Lowest Score': { 'scores.totalScore': 1 },
  'A-Z': { name: 1 },
  'Z-A': { name: -1 },
  'Most Owners': { 'owners.length': -1 },
};

// Default sorting in case none of the above keys match
// const DEFAULT_SORT = { _id: -1 };
const DEFAULT_SORT = { createdAt: -1 };

/**
 * Retrieves public packs based on the provided query parameter.
 *
 * @param {string} queryBy - Specifies how the public packs should be sorted.
 * @return {Promise<any[]>} An array of public packs.
 */
export async function getPublicPacksService(queryBy: string | null = null) {
  try {
    const publicPacksPipeline: any = [
      {
        $match: { is_public: true },
      },
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: 'packs',
          as: 'items',
        },
      },
      {
        $unwind: {
          path: '$items',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner_id',
          foreignField: '_id',
          as: 'owner',
        },
      },
      computeTotalWeightInGrams(),
      {
        $addFields: {
          owner: { $arrayElemAt: ['$owner', 0] },
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          owner_id: { $first: '$owner_id' },
          is_public: { $first: '$is_public' },
          favorited_by: { $first: '$favorited_by' },
          favorites_count: { $first: '$favorites_count' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          owners: { $first: '$owners' },
          grades: { $first: '$grades' },
          scores: { $first: '$scores' },
          type: { $first: '$type' },
          items: { $push: '$items' },
          total_weight: { $sum: '$item_weight' },
          items_count: { $sum: 1 },
        },
      },
    ];

    const sortCriteria = queryBy ? SORT_OPTIONS[queryBy] : DEFAULT_SORT;
    publicPacksPipeline.push({ $sort: sortCriteria });

    const publicPacks = await Pack.aggregate(publicPacksPipeline);

    return publicPacks;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
}
