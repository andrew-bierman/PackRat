import { protectedProcedure } from '../../trpc';
import { Context } from 'hono';
import { addTripService } from '../../services/trip/trip.service';
import * as validator from '@packrat/validations';

interface UserContext extends Context {
  user: { id: string };
}

export const addTrip = async (c: UserContext) => {
  try {
    const requestData = (await c.req.json()) satisfies validator.AddTripType;
    const tripData = { ...requestData, ownerId: c.user.id };
    const trip = await addTripService(tripData, c.executionCtx);
    return c.json(trip, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function addTripRoute() {
  return protectedProcedure.input(validator.addTrip).mutation(async (opts) => {
    const user = opts.ctx.user as { id: string } | null; // Type assertion with null check
    if (!user) {
      throw new Error('User not authenticated');
    }
    const tripData = { ownerId: user.id, ...opts.input };
    return await addTripService(tripData, opts.ctx.executionCtx);
  });
}
