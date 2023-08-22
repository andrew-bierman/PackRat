import { TripNotFoundError } from "../../helpers/errors";
import { getPublicTripsService } from "../../services/trip/getPublicTripService";

/**
 * Retrieves public trips based on the given query parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The public trips as a JSON response.
 */
export const getPublicTrips = async (req, res,next) => {
  try {
    const { queryBy } = req.query;

    const publicTrips = await getPublicTripsService(queryBy);

    res.status(200).json(publicTrips);
  } catch (error) {
    next(TripNotFoundError);
  }
};
