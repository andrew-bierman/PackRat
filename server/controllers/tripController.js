import Trip from "../models/tripModel.js";

export const getTrips = async (req, res) => {
  const { owner_id } = req.body;

  try {
    const trips = await Trip.find({ owner_id }).populate("packs");

    res.status(200).json(trips);
  } catch (error) {
    res.status(404).json({ msg: "trips cannot be found" });
  }
};

export const getTripById = async (req, res) => {
  const { tripId } = req.body;

  try {
    const trip = await Trip.findById({ _id: tripId }).populate("packs");

    res.status(200).json(trip);
  } catch (error) {
    res.status(404).json({ msg: "Trip cannot be found" });
  }
};

export const addTrip = async (req, res) => {
  let newDocument = req.body;

  try {
    await Trip.create(newDocument);
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add trip" });
  }
};

export const editTrip = async (req, res) => {
  const { _id } = req.body;

  try {
    const newTrip = await Trip.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    }).populate("packs");

    res.status(200).json(newTrip);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit trip" });
  }
};

export const deleteTrip = async (req, res) => {
  const { tripId } = req.body;
  try {
    await Trip.findOneAndDelete({ _id: tripId });
    res.status(200).json({ msg: "trip was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete trip" });
  }
};
