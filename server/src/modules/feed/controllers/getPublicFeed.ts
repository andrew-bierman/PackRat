import {
  getNextOffset,
  getPaginationResponse,
} from '../../../helpers/pagination';
import { protectedProcedure } from '../../../trpc';
import { getFeedService } from '../services';
import { z } from 'zod';
import { FeedQueryBy, PaginationParams } from '../models';

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
        queryBy as FeedQueryBy,
        { searchTerm, isPublic: true },
        excludeType,
        pagination as PaginationParams,
      );
      return {
        data,
        ...getPaginationResponse(currentPagination, totalCount as number),
      };
    });
}
