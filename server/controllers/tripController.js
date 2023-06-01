import Trip from "../models/tripModel.js";

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

    const trip = await Trip.findById({ _id: tripId }).populate("packs");

    res.status(200).json(trip);
  } catch (error) {
    res.status(404).json({ msg: "Trip cannot be found" });
  }
};

export const addTrip = async (req, res) => {
  try {
    const { name, description, duration, weather, start_date, end_date, destination, trail, owner_id, packs, is_public } = req.body;

    await Trip.create({ name, description, duration, weather, start_date, end_date, destination, trail, owner_id, packs, is_public });

    res.status(200).json({ msg: "success" });
  } catch (error) {
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
