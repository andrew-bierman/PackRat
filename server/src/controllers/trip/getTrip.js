import Trip from "../../models/tripModel.js";

/**
 * Retrieves trips belonging to a specific owner.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The trips owned by the specified owner.
 */
export const getTrips = async (req, res) => {
    try {
      const { ownerId } = req.packs;
  
      const trips = await Trip.find({ owner_id: ownerId }).populate("packs");
  
      res.status(200).json(trips);
    } catch (error) {
      res.status(404).json({ msg: "trips cannot be found" });
    }
  };
  