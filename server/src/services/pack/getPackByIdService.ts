import Pack from "../../models/packModel";
import mongoose from "mongoose";

/**
 * Retrieves a pack by its ID from the database.
 *
 * @param {string} packId - The ID of the pack to retrieve.
 * @return {Promise<Object>} - A promise that resolves to the retrieved pack object.
 */
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