import { TripNotFoundError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import Trip from "../../models/tripModel";
import { getTripsService } from "../../services/trip/getTripsService";

/**
 * Retrieves trips belonging to a specific owner.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The trips owned by the specified owner.
 */
export const getTrips = async (req, res,next) => {
  try {
    const { ownerId } = req.packs;

    const trips = await getTripsService(ownerId);

    res.locals.data = trips;
    responseHandler(res);
  } catch (error) {
    next(TripNotFoundError)
  }
};
  