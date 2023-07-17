import Trip from "../models/tripModel.js";
import Node from "../models/osm/nodeModel.js";
import Way from "../models/osm/wayModel.js";

export const getPublicTrips = async (req, res) => {
  try {
    const { queryBy } = req.query;

    let publicTripsPipeline = [
      {
        $match: { is_public: true },
      },
      {
        $lookup: {
          from: "packs", // name of the foreign collection
          localField: "_id",
          foreignField: "trips",
          as: "packs",
        },
      },
    ];

    if (queryBy === "Favorite") {
      publicTripsPipeline.push({ $sort: { favorites_count: -1 } });
    } else {
      publicTripsPipeline.push({ $sort: { _id: -1 } });
    }

    const publicTrips = await Trip.aggregate(publicTripsPipeline);

    res.status(200).json(publicTrips);
  } catch (error) {
    res.status(404).json({ msg: "Trips cannot be found" });
  }
};

export const getTrips = async (req, res) => {
  try {
    const { ownerId } = req.packs;

    const trips = await Trip.find({ owner_id: ownerId }).populate("packs");

    res.status(200).json(trips);
  } catch (error) {
    res.status(404).json({ msg: "trips cannot be found" });
  }
};

export const getTripById = async (req, res) => {
  try {
    const { tripId } = req.body;

    const trip = await Trip.findById({
      id: tripId ? tripId : req.params.tripId,
    }).populate({ path: "osm_ref", populate: { path: "nodes" } });
    // .populate({ path: "packs", populate: { path: "items" } })

    console.log("find trip by id", trip);
    console.log("find trip by id osm_ref", trip.osm_ref);

    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Trip cannot be found" });
  }
};

// Helper function to create an OSM object (Node or Way) and return its _id
const createOSMObject = async (geoJSON) => {
  // Check if geoJSON object is valid
  if (!geoJSON || !geoJSON.properties) {
    throw new Error("Invalid or missing geoJSON");
  }

  // Access the OSM type directly from geoJSON properties
  const osmType = geoJSON.properties.osm_type;

  let OSMModel;
  if (osmType === "N") {
    OSMModel = Node;
  } else if (osmType === "W") {
    OSMModel = Way;
  } else {
    throw new Error("Invalid OSM type");
  }

  // Create the corresponding OSM object
  const osmData = new OSMModel({
    osm_id: geoJSON.properties.osm_id,
    osm_type: OSMModel === Node ? "node" : "way", // Here change "W" to "way"
    tags: geoJSON.properties,
    geoJSON,
  });

  // Save the OSM object and return its _id
  await osmData.save();

  console.log("osmData", osmData);

  return {
    osm_ref: osmData._id,
    osm_type: OSMModel === Node ? "Node" : "Way",
  };
};

export const addTrip = async (req, res) => {
  try {
    const {
      name,
      description,
      duration,
      weather,
      start_date,
      end_date,
      destination,
      geoJSON,
      owner_id,
      packs,
      is_public,
    } = req.body;

    // Create the OSM object and get its _id
    const { osm_ref, osm_type } = await createOSMObject(geoJSON);

    await Trip.create({
      name,
      description,
      duration,
      weather,
      start_date,
      end_date,
      destination,
      osm_ref,
      osm_type,
      owner_id,
      packs,
      is_public,
    });

    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Unable to add trip" });
  }
};

export const editTrip = async (req, res) => {
  try {
    const { _id } = req.body;

    const newTrip = await Trip.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    }).populate("packs");

    res.status(200).json(newTrip);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit trip" });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.body;

    await Trip.findOneAndDelete({ _id: tripId });
    res.status(200).json({ msg: "trip was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete trip" });
  }
};
