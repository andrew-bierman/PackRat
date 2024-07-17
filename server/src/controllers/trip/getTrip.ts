import { publicProcedure, protectedProcedure } from '../../trpc';
import { getTripsService } from '../../services/trip/getTripsService';
import * as validator from '@packrat/validations';

/**
 * Retrieves trips belonging to a specific owner.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The trips owned by the specified owner.
 */
export const getTrips = async (c) => {
  try {
    const { owner_id } = await c.req.parseParams();
    const trips = await getTripsService(owner_id);
    return c.json({ trips }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get trips: ${error.message}` }, 500);
  }
};

export function getTripsRoute() {
  return protectedProcedure.input(validator.getTrips).query(async (opts) => {
    const { owner_id } = opts.input;
    if (!owner_id) {
      throw new Error('Owner id is required');
    }
    const trips = await getTripsService(owner_id);
    return trips;
  });
}
