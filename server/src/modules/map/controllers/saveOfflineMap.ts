import { protectedProcedure } from '../../../trpc';
import { saveOfflineMapService } from '../services';
import { z } from 'zod';

export function saveOfflineMapRoute() {
  return protectedProcedure
    .input(
      z.object({
        name: z.string(),
        styleURL: z.string(),
        bounds: z.tuple([z.array(z.number()), z.array(z.number())]),
        minZoom: z.number(),
        maxZoom: z.number(),
        owner_id: z.string(),
        metadata: z.object({ shape: z.string() }),
      }),
    )
    .mutation(async (opts) => {
      const offlineMap = await saveOfflineMapService(opts.input);
      return offlineMap;
    });
}
