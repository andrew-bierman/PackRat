import Pack from "../../models/packModel";
import mongoose from "mongoose";

export const getPackByIdService = async (packId) => {
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

  return pack;
};