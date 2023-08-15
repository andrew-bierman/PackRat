import Trip from "../../models/tripModel.ts";

/**
 * Retrieves a trip by its ID and returns the trip details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the trip details.
 */
export const getTripById = async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.tripId).populate("osm_ref").populate({ path: "owner_id" });
      // .populate({ path: "osm_ref", populate: { path: "nodes" }});
      // .populate({ path: "packs", populate: { path: "items" } })
  
      console.log("find trip by id", req.params.tripId);
      console.log("find trip by id osm_ref", trip.osm_ref);
      // const detail = createOSMObject()
  
      res
        .status(200)
        .json({ ...trip._doc, osm_ref: await trip.osm_ref.toJSON() });
    } catch (error) {
      console.error(error);
      res.status(404).json({ msg: "Trip cannot be found" });
    }
  };