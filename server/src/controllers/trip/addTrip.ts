import { publicProcedure, protectedProcedure } from '../../trpc';
import { addTripService } from '../../services/trip/addTripService';
import * as validator from '@packrat/validations';

export const addTrip = async (c) => {
  try {
    const tripData = await c.req.parseBody();
    return await addTripService(tripData);
  } catch (error) {
    return c.json({ error: `Failed to add trip: ${error.message}` }, 500);
  }
};

export function addTripRoute() {
  return protectedProcedure.input(validator.addTrip).mutation(async (opts) => {
    const tripData = opts.input;
    return await addTripService(tripData);
  });
}
