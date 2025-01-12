import {
  getPaginationResponse,
  PaginationParams,
} from '../../../helpers/pagination';
import { protectedProcedure } from '../../../trpc';
import { getOfflineMapsService } from '../services';
import { z } from 'zod';
import { OfflineMap } from '../../../db/schema';

export function getOfflineMapsRoute() {
  return protectedProcedure
    .input(
      z.object({
        ownerId: z.string(),
        search: z.string().optional(),
        pagination: z
          .object({ limit: z.number(), offset: z.number() })
          .strict(),
      }),
    )
    .query(
      async (opts): Promise<{ data: OfflineMap[]; totalCount: number }> => {
        const { pagination, ownerId, search = '' } = opts.input;
        const { offlineMaps, totalCount } = await getOfflineMapsService(
          ownerId,
          search,
          pagination as { limit: number; offset: number },
        );
        return {
          data: offlineMaps,
          ...getPaginationResponse(
            pagination as PaginationParams,
            Number(totalCount),
          ),
        };
      },
    );
}
