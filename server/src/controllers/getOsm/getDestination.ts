import { protectedProcedure } from '../../trpc';
import { getDestinationService } from '../../services/osm/osm.service';
import { z } from 'zod';
import { type Context } from 'hono';

export const getDestination = async (c: Context) => {
  try {
    const { id } = await c.req.json();
    const destination = await getDestinationService(id);
    return c.json({ destination }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function getDestinationRoute() {
  return protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { id } = opts.input;
      return await getDestinationService(id);
    });
}
