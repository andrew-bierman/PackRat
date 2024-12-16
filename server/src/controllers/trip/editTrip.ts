import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { editTripService } from '../../services/trip/trip.service';
import { Context } from 'hono';

export const editTrip = async (c: Context) => {
  try {
    const tripData = await c.req.json();
    const trip = await editTripService(tripData, c.executionCtx);
    return c.json({ trip }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function editTripRoute() {
  return protectedProcedure.input(validator.editTrip).mutation(async (opts) => {
    const tripData = { ...opts.input };
    const trip = await editTripService(tripData, opts.ctx.executionCtx);
    return trip;
  });
}
