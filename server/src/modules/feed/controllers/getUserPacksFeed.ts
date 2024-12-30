import { getPaginationResponse } from '../../../helpers/pagination';
import { protectedProcedure } from '../../../trpc';
import { getFeedService } from '../services';
import { z } from 'zod';
import { FeedQueryBy, PaginationParams } from '../models';

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
        queryBy as FeedQueryBy,
        { searchTerm, ownerId, isPublic, itemId },
        'trips',
        pagination as PaginationParams,
      );
      return {
        data,
        ...getPaginationResponse(currentPagination, totalCount as number),
      };
    });
}
