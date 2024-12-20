import { getNextOffset, getPaginationResponse } from 'src/helpers/pagination';
import { protectedProcedure } from '../../../trpc';
import { getFeedService } from '../services';
import { z } from 'zod';

export function getPublicFeedRoute() {
  return protectedProcedure
    .input(
      z.object({
        queryBy: z.string(),
        searchTerm: z.string().optional(),
        excludeType: z
          .union([z.literal('trips'), z.literal('packs')])
          .optional(),
        pagination: z.object({ limit: z.number(), offset: z.number() }),
      }),
    )
    .query(async (opts) => {
      const { queryBy, searchTerm, excludeType, pagination } = opts.input;
      const { data, totalCount, currentPagination } = await getFeedService(
        queryBy,
        { searchTerm, isPublic: true, authenticatedUserId: opts.ctx.user.id },
        excludeType,
        pagination,
      );
      return {
        data,
        ...getPaginationResponse(currentPagination, totalCount as number),
      };
    });
}
