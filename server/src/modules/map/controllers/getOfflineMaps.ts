import { getPaginationResponse } from 'src/helpers/pagination';
import { protectedProcedure } from '../../../trpc';
import { getOfflineMapsService } from '../services';
import { z } from 'zod';

export function getOfflineMapsRoute() {
  return protectedProcedure
    .input(
      z.object({
        ownerId: z.string(),
        pagination: z.object({ limit: z.number(), offset: z.number() }),
      }),
    )
    .query(async (opts) => {
      const { pagination, ownerId } = opts.input;
      const { offlineMaps, totalCount } = await getOfflineMapsService(
        ownerId,
        pagination,
      );
      return {
        data: offlineMaps,
        ...getPaginationResponse(pagination, totalCount),
      };
    });
}
