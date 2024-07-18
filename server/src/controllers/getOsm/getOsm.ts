import { ErrorRetrievingOverpassError } from '../../helpers/errors';
import { protectedProcedure } from '../../trpc';
import { getOsmService } from '../../services/osm/getOsmService';
import { z } from 'zod';

export const getOsm = async (c) => {
  try {
    const { activityType, startPoint, endPoint } = await c.req.parseBody();
    const route = await getOsmService({
      activityType,
      startPoint,
      endPoint,
      osmURI: c.env.OSM_URI,
    });
    return c.json({ route }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get OSM route: ${error.message}` }, 500);
  }
};

export function getOsmRoute() {
  return protectedProcedure
    .input(
      z.object({
        activityType: z.string(),
        startPoint: z.object({ latitude: z.number(), longitude: z.number() }),
        endPoint: z.object({ latitude: z.number(), longitude: z.number() }),
      }),
    )
    .query(async (opts) => {
      const { env }: any = opts.ctx;
      try {
        const { activityType, startPoint, endPoint } = opts.input;
        return await getOsmService({
          activityType,
          startPoint,
          endPoint,
          osmURI: env.OSM_URI,
        });
      } catch (error) {
        return ErrorRetrievingOverpassError;
      }
    });
}
