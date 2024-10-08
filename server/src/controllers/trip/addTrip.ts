import { publicProcedure, protectedProcedure } from '../../trpc';
import { addTripService } from '../../services/trip/addTripService';
import * as validator from '@packrat/validations';

export const addTrip = async (c) => {
  try {
    const tripData = await c.req.json();
    const trip = await addTripService(tripData);
    return c.json(trip, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function addTripRoute() {
  return protectedProcedure.input(validator.addTrip).mutation(async (opts) => {
    const tripData = opts.input;
    return await addTripService(tripData, opts.ctx.executionCtx);
  });
}
