import { publicProcedure } from '../../trpc';
import { TripNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPublicTripsService } from '../../services/trip/getPublicTripService';
import * as validator from '../../middleware/validators';
import { z } from 'zod';
import { QueryType } from '../../helpers/queryTypeEnum'
/**
 * Retrieves public trips based on the given query parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The public trips as a JSON response.
 */
export const getPublicTrips = async (req, res, next) => {
  try {
    const { queryBy, type, page, pageSize } = req.query;

    const publicTrips = await getPublicTripsService(queryBy, type, page, pageSize);

    res.locals.data = publicTrips;
    responseHandler(res);
  } catch (error) {
    next(TripNotFoundError);
  }
};

export function getPublicTripsRoute() {
  return publicProcedure
    .input(z.object({
      queryBy: z.string(),
      type: z.string().optional(),
      page: z.number().optional(),
      pageSize: z.number().optional(),
    }))
    .query(async (opts) => {

      const { queryBy, type = QueryType.Default, page = 1, pageSize = 10 } = opts.input;
      
      return await getPublicTripsService(queryBy, type, page, pageSize);
    });
}
