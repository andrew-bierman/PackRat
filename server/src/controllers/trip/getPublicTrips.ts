import { protectedProcedure } from '../../trpc';
import { getPublicTripsService } from '../../services/trip/getPublicTripService';
import { z } from 'zod';
import { type Context } from 'hono';

export const getPublicTrips = async (c: Context) => {
  try {
    const { queryBy } = await c.req.json();
    const trips = await getPublicTripsService(queryBy);
    return c.json({ trips }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function getPublicTripsRoute() {
  return protectedProcedure
    .input(z.object({ queryBy: z.string() }))
    .query(async (opts) => {
      const { queryBy } = opts.input;
      const trips = await getPublicTripsService(queryBy);
      return trips;
    });
}
