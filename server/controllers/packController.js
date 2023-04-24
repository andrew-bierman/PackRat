import Pack from "../models/packModel.js";
import mongoose from "mongoose";
import { oneEntity } from "../utils/oneEntity.js"
import { packValidation } from "../utils/pack.js"

export const getPublicPacks = async (req, res) => {
  const { queryBy } = req.query;

  try {
    let publicPacks;
    if (queryBy === "Favorite") {
      publicPacks = await Pack.aggregate([
        {
          $match: { is_public: true },
        },
        {
          $lookup: {
            from: "items", // name of the foreign collection
            localField: "_id",
            foreignField: "packId",
            as: "lookup-data",
          },
        },
        {
          $addFields: {
            total_weight: {
              $sum: "$lookup-data.weight",
            },
          },
        },
        { $project: { "lookup-data": 0 } },
      ]).sort({ favorites_count: -1 });
    } else {
      publicPacks = await Pack.aggregate([
        {
          $match: { is_public: true },
        },
        {
          $lookup: {
            from: "items", // name of the foreign collection
            localField: "_id",
            foreignField: "packId",
            as: "lookup-data",
          },
        },
        {
          $addFields: {
            total_weight: {
              $sum: "$lookup-data.weight",
            },
          },
        },
        { $project: { "lookup-data": 0 } },
      ]).sort({ _id: -1 });
    }

    res.status(200).json(publicPacks);
  } catch (error) {
    res.status(404).json({ msg: "Packs cannot be found" });
  }
};

export const getPacks = async (req, res) => {
  const { ownerId } = await oneEntity(req.params);

  try {
    const aggr = await Pack.aggregate([
      {
        $match: { owner_id: new mongoose.Types.ObjectId(ownerId) },
      },
      {
        $lookup: {
          from: "items", // name of the foreign collection
          localField: "_id",
          foreignField: "packId",
          as: "lookup-data",
        },
      },
      {
        $addFields: {
          total_weight: {
            $sum: "$lookup-data.weight",
          },
        },
      },
      { $project: { "lookup-data": 0 } },
    ]);

    res.status(200).json(aggr);
  } catch (error) {
    res.status(404).json({ msg: "Users cannot be found" });
  }
};

export const getPackById = async (req, res) => {
  const { _id } = await oneEntity(req.body._id)

  try {
    const pack = await Pack.findById({ _id }).populate("total_weight");

    const aggr = await Pack.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(_id) },
      },
      {
        $lookup: {
          from: "items", // name of the foreign collection
          localField: "_id",
          foreignField: "packId",
          as: "lookup-data",
        },
      },
      {
        $addFields: {
          total_weight: {
            $sum: "$lookup-data.weight",
          },
        },
      },
      { $project: { "lookup-data": 0 } },
    ]);

    res.status(200).json(aggr);
  } catch (error) {
    res.status(404).json({ msg: "Pack cannot be found" });
  }
};

export const addPack = async (req, res) => {
  const packBody = packValidation(req.body)
  const newPack = {
    ...packBody,
    items: [],
    is_public: false,
    favorited_by: [],
    favorites_count: 0,
    createdAt: new Date(),
  };

  try {
    const exists = await Pack.find({ name: req.body.name });

    if (exists[0]?.name?.toLowerCase() === req.body.name.toLowerCase()) {
      throw new Error("Pack already exists");
    }

    await Pack.create(newPack);
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const editPack = async (req, res) => {
  const { _id } = await oneEntity(req.body._id)

  try {
    const newPack = await Pack.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });

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
