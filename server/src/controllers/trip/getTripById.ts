import { publicProcedure, protectedProcedure } from '../../trpc';
import { getTripByIdService } from '../../services/trip/getTripByIdService';
import * as validator from '@packrat/validations';

export const getTripById = async (c) => {
  try {
    const { tripId } = await c.req.parseParams();
    return await getTripByIdService(tripId);
  } catch (error) {
    return c.json({ error: `Failed to get trip: ${error.message}` }, 500);
  }
};

export function getTripByIdRoute() {
  return protectedProcedure.input(validator.getTripById).query(async (opts) => {
    const { tripId } = opts.input;
    return await getTripByIdService(tripId);
  });
}
