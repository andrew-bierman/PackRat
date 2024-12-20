import { getPaginationResponse } from 'src/helpers/pagination';
import { protectedProcedure } from '../../../trpc';
import { getFeedService } from '../services';
import { z } from 'zod';

export function getUserPacksFeedRoute() {
  return protectedProcedure
    .input(
      z.object({
        queryBy: z.string(),
        ownerId: z.string(),
        itemId: z.string().optional(),
        isPublic: z.boolean().optional(),
        isPreview: z.boolean().optional(),
        searchTerm: z.string().optional(),
        pagination: z
          .object({ limit: z.number(), offset: z.number() })
          .optional(),
      }),
    )
    .query(async (opts) => {
      const { queryBy, searchTerm, ownerId, pagination, isPublic, itemId } =
        opts.input;
      const { data, totalCount, currentPagination } = await getFeedService(
        queryBy,
        {
          searchTerm,
          ownerId,
          isPublic,
          itemId,
          authenticatedUserId: opts.ctx.user.id,
        },
        'trips',
        pagination,
      );
      return {
        data,
        ...getPaginationResponse(currentPagination, totalCount as number),
      };
    });
}
