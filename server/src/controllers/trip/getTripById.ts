import { publicProcedure, protectedProcedure } from '../../trpc';
import { getTripByIdService } from '../../services/trip/getTripByIdService';
import * as validator from '@packrat/validations';

export const getTripById = async (c) => {
  try {
    const { tripId } = await c.req.param();
    const trip = await getTripByIdService(tripId);
    return c.json(trip, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function getTripByIdRoute() {
  return protectedProcedure.input(validator.getTripById).query(async (opts) => {
    const { tripId } = opts.input;
    return await getTripByIdService(tripId);
  });
}
