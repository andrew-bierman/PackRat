import Pack from "../models/packModel.js";
import mongoose from "mongoose";
import { calculatePackScore } from "../utils/scorePack.js";

// Endpoint to get all public packs based on query criteria
export const getPublicPacks = async (req, res) => {
  try {
    const { queryBy } = req.query;

    // Define the aggregation pipeline to fetch public packs
    let publicPacksPipeline = [
      {
        $match: { is_public: true },
      },
      {
        $lookup: {
          from: "items", // name of the foreign collection
          localField: "_id",
          foreignField: "packs",
          as: "items",
        },
      },
      {
        $lookup: {
          from: 'users', // Replace 'users' with the actual name of your 'User' collection
          localField: 'owner_id',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $addFields: {
          total_weight: {
            $sum: {
              $map: {
                input: "$items",
                as: "item",
                in: { $multiply: ["$$item.weight", "$$item.quantity"] },
              },
            },
          },
          owner: { $arrayElemAt: ['$owner', 0] },
        },
      },
    ];

    // Based on queryBy, sort the public packs by favorites count or pack id
    if (queryBy === "Favorite") {
      publicPacksPipeline.push({ $sort: { favorites_count: -1 } });
    } else {
      publicPacksPipeline.push({ $sort: { _id: -1 } });
    }

    // Perform the aggregation to fetch public packs
    const publicPacks = await Pack.aggregate(publicPacksPipeline);

    res.status(200).json(publicPacks);
  } catch (error) {
    res.status(404).json({ msg: "Packs cannot be found" });
  }
};

// Endpoint to get packs owned by a specific user
export const getPacks = async (req, res) => {
  try {
    const { ownerId } = req.params;

    // Define the aggregation pipeline to fetch packs owned by the user
    const packs = await Pack.aggregate([
      {
        // Match packs with the given ownerId in the owners array
        $match: { owners: new mongoose.Types.ObjectId(ownerId) },
      },
      {
        // Perform a lookup to get items associated with each pack
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "packs",
          as: "items",
        },
      },
      {
        // Perform a lookup to get the category name of each item
        $lookup: {
          from: "itemcategories",
          localField: "items.category",
          foreignField: "_id",
          as: "items.category",
        },
      },
      {
        // Add the category name to the pack document
        $addFields: {
          category: { $arrayElemAt: ["$items.category.name", 0] },
        },
      },
      {
        // Group the items based on individual packs
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

// Endpoint to get a pack by its ID
export const getPackById = async (req, res) => {
  try {
    const { packId } = req.params;

    // Find the pack by its ID and populate its items with category information
    const objectId = new mongoose.Types.ObjectId(packId);
    const pack = await Pack.findById(objectId).populate({
      path: "items",
      populate: {
        path: "category",
        select: "name",
      },
    }).populate({
      path: "owners",
    });
    
    res.status(200).json(pack);
  } catch (error) {
    console.error("getPackById error", error);
    res.status(404).json({ msg: "Pack cannot be found" });
  }
};

// Endpoint to add a new pack
export const addPack = async (req, res) => {
  try {
    const { name, owner_id } = req.body;

    // Create a new pack document with the provided data
    const newPack = {
      name: name,
      owner_id: owner_id,
      items: [],
      is_public: false,
      favorited_by: [],
      favorites_count: 0,
      createdAt: new Date(),
      owners: [owner_id],
    };

    // Check if a pack with the same name already exists
    const exists = await Pack.find({ name: name });

    // Create the new pack in the database
    const createdPack = await Pack.create(newPack);
    res.status(200).json({ msg: "success", createdPack });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

// Endpoint to edit an existing pack
export const editPack = async (req, res) => {
  try {
    const { _id } = req.body;

    // Update the pack with the provided data and return the updated pack
    const newPack = await Pack.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });

    res.status(200).json(newPack);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit pack" });
  }
};

// Endpoint to delete a pack
export const deletePack = async (req, res) => {
  try {
    const { packId } = req.body;

    // Delete the pack with the specified packId
    await Pack.findOneAndDelete({ _id: packId });
    res.status(200).json({ msg: "pack was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete pack" });
  }
};

// Endpoint to duplicate a public pack and make it private for the specified owner
export const duplicatePublicPack = async (req, res) => {
  try {
    const { packId, ownerId, items } = req.body;

    // Find the public pack to duplicate
    let pack = await Pack.findById(packId);
    if (!pack) {
      // Pack with specified ID not found
      return res.status(404).json({ error: "Pack not found" });
    }

    // Create a new pack with the same data as the public pack but with a new owner and make it private
    pack = await Pack.create({
      name: pack.name,
      items: items,
      owner_id: pack.owner_id,
      is_public: false,
      favorited_by: pack.favorited_by,
      favorites_count: pack.favorites_count,
      createdAt: new Date().toISOString(),
      owners: [pack.owners, ownerId],
      grades: { ...pack.grades },
      scores: { ...pack.scores },
      type: pack.type,
    });
    res
      .status(200)
      .json({ msg: "pack was duplicated successfully", data: pack });
  } catch (error) {
    res.status(404).json({ msg: "Unable to duplicate pack" + error });
  }
};

// Endpoint to calculate and update the score for a pack
export const scorePack = async (req, res) => {
  try {
    const { packId } = req.params;

    // Find the pack by its ID and populate its items
    const objectId = new mongoose.Types.ObjectId(packId);
    const packData = await Pack.findById(objectId).populate("items");

    // Call the scoring function to calculate the pack score
    const packScore = calculatePackScore(packData);

    const { scores, grades } = packScore;

    // Update the pack with the new scores and grades
    const updatedPack = await Pack.findByIdAndUpdate(
      { _id: packId },
      { scores: scores, grades: grades },
      { returnOriginal: false }
    );

    res.status(200).json({ msg: "Pack was scored successfully", updatedPack });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ msg: "Unable to score pack", error });
  }
};
