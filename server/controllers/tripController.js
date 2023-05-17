import Trip from "../models/tripModel.js";
import { tripValidation } from "../utils/trip.js"
import Joi from "joi";
import { JoiObjectId } from "../utils/validator.js"

export const getTrips = async (req, res) => {
  const { owner_id } = req.body;

  const bodySchema = Joi.object({
    owner_id: JoiObjectId().required(),
  });
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const trips = await Trip.find({ owner_id }).populate("packs");

    res.status(200).json(trips);
  } catch (error) {
    res.status(404).json({ msg: "trips cannot be found" });
  }
};

export const getTripById = async (req, res) => {
  const { tripId } = req.body;

  const bodySchema = Joi.object({
    tripId: JoiObjectId().required(),
  });
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const trip = await Trip.findById({ _id: tripId }).populate("packs");

    res.status(200).json(trip);
  } catch (error) {
    res.status(404).json({ msg: "Trip cannot be found" });
  }
};

export const addTrip = async (req, res) => {
  const { name, duration, weather, start_date, end_date, destination, owner_id, packs, is_public } = req.body;

  const bodySchema = Joi.object({
    name: Joi.string().required(),
    duration: Joi.string().required(),
    weather: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    destination: Joi.string().required(),
    owner_id: Joi.string().required(),
    packs: Joi.string().required(),
  });
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    await Trip.create({ name, duration, weather, start_date, end_date, destination, owner_id, packs, is_public });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add trip" });
  }
};

export const editTrip = async (req, res) => {
  const { _id } = req.body;

  const bodySchema = Joi.object({
    _id: JoiObjectId().required(),
  });
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

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

  const bodySchema = Joi.object({
    tripId: JoiObjectId().required(),
  });
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    await Trip.findOneAndDelete({ _id: tripId });
    res.status(200).json({ msg: "trip was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete trip" });
  }
};
