import { protectedProcedure } from '../../trpc';
import { getDestinationService } from '../../services/osm/osm.service';
import { z } from 'zod';

export const getDestination = async (c) => {
  try {
    const { id } = await c.req.parseBody();
    const destination = await getDestinationService(id);
    return c.json({ destination }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to get destination: ${error.message}` },
      500,
    );
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
