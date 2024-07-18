import { getParksOSMService } from '../../services/osm/getParksOSMService';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';

export const getParksOSM = async (c) => {
  try {
    const { lat, lon, radius } = await c.req.parseBody();
    const parks = await getParksOSMService(lat, lon, radius, c.env.OSM_URI);
    return c.json({ parks }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get parks: ${error.message}` }, 500);
  }
};

export function getParksOSMRoute() {
  return protectedProcedure.input(validator.getParksOSM).query(async (opts) => {
    const { lat = 45.5231, lon = -122.6765, radius = 50000 } = opts.input;
    const { env }: any = opts.ctx;
    return await getParksOSMService(lat, lon, radius, env.OSM_URI);
  });
}
