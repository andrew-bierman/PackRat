import Pack from "../../models/packModel.js";
import mongoose from "mongoose";

/**
 * Retrieves a pack by its ID and returns it as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The pack object as a JSON response.
 */
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
      }).populate({
        path: "owners",
      });
      
      res.status(200).json(pack);
    } catch (error) {
      console.error("getPackById error", error); // Add this line
      res.status(404).json({ msg: "Pack cannot be found" });
    }
  };