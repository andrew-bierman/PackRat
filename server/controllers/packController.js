import Pack from "../models/packModel.js";
import mongoose from "mongoose";
import { oneEntity } from "../utils/oneEntity.js"
import { packValidation } from "../utils/pack.js"

export const getPublicPacks = async (req, res) => {
  const { queryBy } = req.query;

  try {
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
  const { ownerId } = req.params;

  try {
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
    ]);

    res.status(200).json(packs);
  } catch (error) {
    res.status(404).json({ msg: "Users cannot be found" });
  }
};


export const getPackById = async (req, res) => {
  const { packId } = req.params;

  try {
    const objectId = new mongoose.Types.ObjectId(packId);
    const pack = await Pack.findById(objectId).populate("items");

    res.status(200).json(pack);
  } catch (error) {
    console.error('getPackById error', error); // Add this line
    res.status(404).json({ msg: "Pack cannot be found" });
  }
};

export const addPack = async (req, res) => {
  // const packBody = packValidation(req.body)
  if (!req.body.name || !req.body.owner_id) {
    res.status(404).json({ msg: "All fields must be filled" });
  }

  const newPack = {
    // ...packBody,
    name: req.body.name,
    owner_id: req.body.owner_id,
    items: [],
    is_public: false,
    favorited_by: [],
    favorites_count: 0,
    createdAt: new Date(),
    owners: [req.body.owner_id],
  };

  console.log('newPack', newPack)

  try {
    const exists = await Pack.find({ name: req.body.name });

    // if (exists[0]?.name?.toLowerCase() === req.body.name.toLowerCase()) {
    //   throw new Error("Pack already exists");
    // }

    const createdPack = await Pack.create(newPack);
    res.status(200).json({ msg: "success", createdPack });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const editPack = async (req, res) => {
  // const { _id } = await oneEntity(req.body._id)
  const { _id } = req.body

  try {
    const newPack = await Pack.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });

    console.log('newPack', newPack)

    res.status(200).json(newPack);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit pack" });
  }
};

export const deletePack = async (req, res) => {
  const { packId } = await oneEntity(req.body.packId)

  try {
    await Pack.findOneAndDelete({ _id: packId });
    res.status(200).json({ msg: "pack was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete pack" });
  }
};
