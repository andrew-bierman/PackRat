import Pack from "../models/packModel.js";
import mongoose from "mongoose";
import { calculatePackScore } from "../utils/scorePack.js";

export const getPublicPacks = async (req, res) => {
  try {
    const { queryBy } = req.query;

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
        },
      },
    ];

    if (queryBy === "Favorite") {
      publicPacksPipeline.push({ $sort: { favorites_count: -1 } });
    } else {
      publicPacksPipeline.push({ $sort: { _id: -1 } });
    }

    const publicPacks = await Pack.aggregate(publicPacksPipeline);

    res.status(200).json(publicPacks);
  } catch (error) {
    res.status(404).json({ msg: "Packs cannot be found" });
  }
};

export const getPacks = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const packs = await Pack.aggregate([
      {
        $match: { owners: new mongoose.Types.ObjectId(ownerId) },
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
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "itemcategories",
          localField: "items.category",
          foreignField: "_id",
          as: "items.category",
        },
      },
      {
        $addFields: {
          "items.category": { $arrayElemAt: ["$items.category", 0] },
        },
      },
      {
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
          category: { $first: "$items.category.name" },
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
    res.status(404).json({ msg: "Users cannot be found" });
  }
};

export const getPackById = async (req, res) => {
  try {
    const { packId } = req.params;

    const objectId = new mongoose.Types.ObjectId(packId);
    const pack = await Pack.findById(objectId).populate({
      path: "items",
      populate: {
        path: "category",
        select: "name",
      },
    });

    res.status(200).json(pack);
  } catch (error) {
    console.error("getPackById error", error); // Add this line
    res.status(404).json({ msg: "Pack cannot be found" });
  }
};

export const addPack = async (req, res) => {
  try {
    const { name, owner_id, owners } = req.body;

    const exists = await Pack.find({ name: name });

    if (exists.length > 0) {
      return res.status(400).json({ msg: "Pack already exists" });
    }

    const newPack = {
      name: name,
      owner_id: owner_id,
      items: [],
      is_public: false,
      favorited_by: [],
      favorites_count: 0,
      createdAt: new Date(),
      owners: owners || [owner_id], // Use owners if provided or default to owner_id
    };

    console.log("newPack", newPack);

    // if (exists[0]?.name?.toLowerCase() === name.toLowerCase()) {
    //   throw new Error("Pack already exists");
    // }

    const createdPack = await Pack.create(newPack);
    res.status(200).json({ msg: "success", createdPack });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const editPack = async (req, res) => {
  try {
    const { _id, owners } = req.body; // Added owners

    const newPack = await Pack.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });

    // After updating the pack, if owners were provided, sync them
    if (owners) {
      newPack.owners = owners;
      await newPack.save();
    }

    res.status(200).json(newPack);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit pack" });
  }
};

export const deletePack = async (req, res) => {
  try {
    const { packId } = req.body;

    await Pack.findOneAndDelete({ _id: packId });
    res.status(200).json({ msg: "pack was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete pack" });
  }
};

export const scorePack = async (req, res) => {
  try {
    const { packId } = req.params;

    const objectId = new mongoose.Types.ObjectId(packId);
    const packData = await Pack.findById(objectId).populate("items");

    // console.log("packData", packData)

    // Call the scoring function to calculate the pack score

    const packScore = calculatePackScore(packData);

    console.log("packScore", packScore);

    const { scores, grades } = packScore;

    const updatedPack = await Pack.findByIdAndUpdate(
      { _id: packId },
      { scores: scores, grades: grades },
      { returnOriginal: false }
    );

    console.log("updatedPack", updatedPack);

    res.status(200).json({ msg: "Pack was scored successfully", updatedPack });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ msg: "Unable to score pack", error });
  }
};

export const copyPack = async (req, res) => {
  try {
    const { packId } = req.params;
    const { ownerId } = req.body;

    // Input validation
    if (!mongoose.Types.ObjectId.isValid(packId) || !mongoose.Types.ObjectId.isValid(ownerId)) {
      res.status(400).json({ msg: "Invalid packId or ownerId" });
      return;
    }

    const packToCopy = await Pack.findById(packId);

    if (!packToCopy) {
      res.status(404).json({ msg: "Pack not found" });
      return;
    }

    const newPack = new Pack(packToCopy.toObject());
    newPack._id = mongoose.Types.ObjectId(); // Generate a new id for copied pack
    newPack.owner_id = ownerId; // Assign new owner
    newPack.owners = [ownerId]; // Assign new owner
    newPack.isNew = true; // This makes mongoose treat this document as a new one

    await newPack.save();
    res.status(200).json(newPack);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "Unable to copy pack" });
  }
};
