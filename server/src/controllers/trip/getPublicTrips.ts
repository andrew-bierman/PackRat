import { publicProcedure } from '../../trpc';
import { TripNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPublicTripsService } from '../../services/trip/getPublicTripService';
import * as validator from '../../../../packages/src/validations';

/**
 * Retrieves public trips based on the given query parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The public trips as a JSON response.
 */
export const getPublicTrips = async (req, res, next) => {
  try {
    const { queryBy } = req.query;

    const publicTrips = await getPublicTripsService(queryBy);

    res.locals.data = publicTrips;
    responseHandler(res);
  } catch (error) {
    next(TripNotFoundError);
  }
};

export function getPublicTripsRoute() {
  return publicProcedure.input(validator.queryTrip).query(async (opts) => {
    const { queryBy } = opts.input;
    return await getPublicTripsService(queryBy);
  });
}