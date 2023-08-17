import { addTripService } from "../../services/trip/addTripService.ts";

/**
 * Adds a trip to the database.
 * @param {Object} req - The request object containing the trip details.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a success message or rejects with an error message.
 */
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

    const tripDetails = {
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
    };

    const result = await addTripService(tripDetails);

    res.status(200).json({ msg: result });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Unable to add trip" });
  }
};

