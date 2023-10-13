import { publicProcedure } from '../../trpc';
import { UnableToAddTripError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { addTripService } from '../../services/trip/addTripService';
import * as validator from '../../middleware/validators/index';
/**
 * Adds a trip to the database.
 * @param {Object} req - The request object containing the trip details.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a success message or rejects with an error message.
 */
export const addTrip = async (c, next) => {
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
    } = c.req.json();

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

    res.locals.data = result;
    responseHandler(c);
  } catch (error) {
    next(UnableToAddTripError);
  }
};

export function addTripRoute() {
  return publicProcedure.input(validator.addTrip).mutation(async (opts) => {
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
    } = opts.input;
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
    return await addTripService(tripDetails);
  });
}
