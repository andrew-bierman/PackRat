import { publicProcedure, protectedProcedure } from '../../trpc';
import { getTripsService } from '../../services/trip/getTripsService';
import * as validator from '@packrat/validations';

export const getTrips = async (c) => {
  try {
    const { owner_id } = await c.req.parseParams();
    const trips = await getTripsService(owner_id);
    return c.json({ trips }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
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
