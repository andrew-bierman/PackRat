import { publicProcedure } from '../../trpc';
import { TripNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPublicTripsService } from '../../services/trip/getPublicTripService';
import * as validator from '../../middleware/validators';
import { z } from 'zod';
/**
 * Retrieves public trips based on the given query parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The public trips as a JSON response.
 */
export const getPublicTrips = async (req, res, next) => {
  try {
    const { queryBy, pageNo, recordsPerPage } = req.query;

    const publicTrips = await getPublicTripsService(
      queryBy,
      pageNo,
      recordsPerPage,
    );

    res.locals.data = publicTrips;
    responseHandler(res);
  } catch (error) {
    next(TripNotFoundError);
  }
};

export function getPublicTripsRoute() {
  return publicProcedure
    .input(
      z.object({
        queryBy: z.string(),
        pageNo: z.number().optional(),
        recordsPerPage: z.number().optional(),
      }),
    )
    .query(async (opts) => {
      const { queryBy, pageNo, recordsPerPage } = opts.input;
      return await getPublicTripsService(queryBy, pageNo, recordsPerPage);
    });
}
