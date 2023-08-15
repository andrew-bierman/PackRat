import Pack from "../../models/packModel.js";
import mongoose from "mongoose";

/**
 * Retrieves packs associated with a specific owner.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise} - Array of packs.
 */
export const getPacks = async (req, res) => {
    try {
      const { ownerId } = req.params;
  
      const packs = await Pack.aggregate([
        // matches the pack owners array with the given ownerId
        {
          $match: { owners: new mongoose.Types.ObjectId(ownerId) },
        },
        {
          // looks up into the items collection for those docs that have _id in packs column in items collection and returns them as items
          $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "packs",
            as: "items",
          },
        },
        // looks up into the itemscategories collection for those docs that have items.category in itemcategories column as id and returns them as items.category. basically its left joining the document
        {
          $lookup: {
            from: "itemcategories",
            localField: "items.category",
            foreignField: "_id",
            as: "items.category",
          },
        },
        {
          // then it picks the category name to be added in docs
          $addFields: {
            category: { $arrayElemAt: ["$items.category.name", 0] },
          },
        },
        {
          // then it groups the item based on individual items
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            owner_id: { $first: "$owner_id" },
            is_public: { $first: "$is_public" },
            favorited_by: { $first: "$favorited_by" },
            favorites_count: { $first: "$favorites_count" },
            createdAt: { $first: "$createdAt" },
            owners: { $first: "$owners" },
            grades: { $first: "$grades" },
            scores: { $first: "$scores" },
            type: { $first: "$type" },
            items: { $push: "$items" },
            total_weight: {
              $sum: {
                $multiply: ["$items.weight", "$items.quantity"],
              },
            },
          },
        },
      ]);
  
      res.status(200).json(packs);
    } catch (error) {
      console.log("error", error);
      res.status(404).json({ msg: "Packs cannot be found " + error.message });
    }
  };