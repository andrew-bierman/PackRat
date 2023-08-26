import Pack from '../../models/packModel';
import { computeTotalWeightInGrams } from '../../utils/convertWeight';

/**
 * Retrieves public packs based on the provided query parameter.
 *
 * @param {string} queryBy - Specifies how the public packs should be sorted.
 * @return {Promise<any[]>} An array of public packs.
 */
export async function getPublicPacksService(queryBy: string) {
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
          owners: { $first: '$owners' },
          grades: { $first: '$grades' },
          scores: { $first: '$scores' },
          type: { $first: '$type' },
          items: { $push: '$items' },
          total_weight: { $sum: '$item_weight' },
        },
      },
    ];

    if (queryBy === 'Favorite') {
      publicPacksPipeline.push({ $sort: { favorites_count: -1 } });
    } else {
      publicPacksPipeline.push({ $sort: { _id: -1 } });
    }

    const publicPacks = await Pack.aggregate(publicPacksPipeline);

    return publicPacks;
  } catch (error) {
    throw new Error('Packs cannot be found: ' + error.message);
  }
}
