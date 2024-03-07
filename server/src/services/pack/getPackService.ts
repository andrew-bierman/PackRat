import Pack from '../../models/packModel';
import mongoose from 'mongoose';
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
 * Retrieves packs service for a given ownerId and query parameter.
 *
 * @param {string} ownerId - The ID of the owner.
 * @param {string} queryBy - Specifies how the public packs should be sorted.
 * @return {Promise<Array>} An array of packs.
 */
export const getPacksService = async (
  ownerId,
  queryBy: string | null = null,
) => {
  try {
    const userPacksPipeline: any = [
      {
        $match: { owners: new mongoose.Types.ObjectId(ownerId) },
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
          from: 'itemcategories',
          localField: 'items.category',
          foreignField: '_id',
          as: 'items.category',
        },
      },
      {
        $addFields: {
          category: { $arrayElemAt: ['$items.category.name', 0] },
        },
      },
      computeTotalWeightInGrams(),
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          owner_id: { $first: '$owner_id' },
          is_public: { $first: '$is_public' },
          favorited_by: { $first: '$favorited_by' },
          favorites_count: { $first: '$favorites_count' },
          createdAt: { $first: '$createdAt' },
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
    userPacksPipeline.push({ $sort: sortCriteria });

    const packs = await Pack.aggregate(userPacksPipeline);

    return packs;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
};
