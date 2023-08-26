import Pack from '../../models/packModel';
import mongoose from 'mongoose';
import { computeTotalWeightInGrams } from '../../utils/convertWeight';

/**
 * Retrieves packs service for a given ownerId.
 *
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<Array>} An array of packs.
 */
export const getPacksService = async (ownerId) => {
  const packs = await Pack.aggregate([
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
      },
    },
  ]);

  return packs;
};
