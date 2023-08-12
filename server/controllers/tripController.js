import Trip from "../models/tripModel.js";
import GeoJSON from "../models/geojsonModel.js";

// Get all public trips
export const getPublicTrips = async (req, res) => {
  try {
    const { queryBy } = req.query;

    let publicTripsPipeline = [
      {
        $match: { is_public: true },
      },
      {
        // Perform a lookup to get the packs associated with each trip
        $lookup: {
          from: "packs", // name of the foreign collection
          localField: "_id",
          foreignField: "trips",
          as: "packs",
        },
      },
      {
        $lookup: {
          from: "users", // Replace 'users' with the actual name of your 'User' collection
          localField: "owner_id",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $addFields: {
          owner: { $arrayElemAt: ["$owner", 0] },
        },
      },
    ];

    if (queryBy === "Favorite") {
      // If sorting by favorites, add a $sort stage to sort by favorites_count in descending order
      publicTripsPipeline.push({ $sort: { favorites_count: -1 } });
    } else {
      // Otherwise, sort by _id in descending order (latest first)
      publicTripsPipeline.push({ $sort: { _id: -1 } });
    }

    // Execute the aggregation pipeline and retrieve the public trips
    const publicTrips = await Trip.aggregate(publicTripsPipeline);

    res.status(200).json(publicTrips);
  } catch (error) {
    res.status(404).json({ msg: "Trips cannot be found" });
  }
};

// Get all trips belonging to a specific owner (user)
export const getTrips = async (req, res) => {
  try {
    const { ownerId } = req.packs; // Typo? Should it be req.params?

    // Find all trips with the specified owner_id and populate the packs field
    const trips = await Trip.find({ owner_id: ownerId }).populate("packs");

    res.status(200).json(trips);
  } catch (error) {
    res.status(404).json({ msg: "Trips cannot be found" });
  }
};

// Get a trip by its ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    // Log the trip ID and the associated osm_ref for debugging purposes
    console.log("find trip by id", req.params.tripId);

    // Return the trip data along with the osm_ref as a JSON object
    res.status(200).json({ ...trip._doc, osm_ref: await trip.osm_ref.toJSON() });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Trip cannot be found" });
  }
};

// Helper function to create an OSM object (Node, Way, or Relation) and return its _id
// This function is called when adding a new trip to associate an osm_ref with the trip
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
  } else if (osmType === "R") {
    OSMModel = Relation;
  } else {
    throw new Error("Invalid OSM type");
  }

  // Create the corresponding OSM object
  const osmData = new OSMModel({
    osm_id: geoJSON.properties.osm_id,
    osm_type:
      OSMModel === Node ? "node" : OSMModel === Way ? "way" : "relation", // Here change "W" to "way"
    tags: geoJSON.properties,
    geoJSON,
  });

  // Save the OSM object and return its _id
  await osmData.save();

  console.log("osmData", osmData);

  return {
    osm_ref: osmData._id,
    osm_type:
      OSMModel === Node ? "Node" : OSMModel === Way ? "Way" : "Relation",
  };
};

// Add a new trip
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

    const savedFeatures = await GeoJSON.saveMany(geoJSON.features);

    // Create the new trip using the provided data and associated osm_ref
    await Trip.create({
      name,
      description,
      duration,
      weather,
      start_date,
      end_date,
      destination,
      geojson: savedFeatures.map((f) => f._id),
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

// Edit an existing trip
export const editTrip = async (req, res) => {
  try {
    const { _id } = req.body;

    // Find the trip by its _id and update its data with the provided request body
    const newTrip = await Trip.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    }).populate("packs");

    res.status(200).json(newTrip);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit trip" });
  }
};

// Delete a trip by its ID
export const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.body;

    // Find the trip by its ID and delete it
    await Trip.findOneAndDelete({ _id: tripId });
    res.status(200).json({ msg: "Trip was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete trip" });
  }
};
