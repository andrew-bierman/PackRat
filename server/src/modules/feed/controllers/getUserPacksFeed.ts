import { getNextOffset } from 'src/helpers/pagination';
import { protectedProcedure } from '../../../trpc';
import { getFeedService } from '../services';
import { z } from 'zod';

export function getUserPacksFeedRoute() {
  return protectedProcedure
    .input(
      z.object({
        queryBy: z.string(),
        ownerId: z.string(),
        isPublic: z.boolean().optional(),
        searchTerm: z.string().optional(),
        pagination: z
          .object({ limit: z.number(), offset: z.number() })
          .optional(),
      }),
    )
    .query(async (opts) => {
      const { queryBy, searchTerm, ownerId, pagination, isPublic } = opts.input;
      const { data, totalCount } = await getFeedService(
        queryBy,
        { searchTerm, ownerId, isPublic },
        'trips',
        pagination,
      );
      return { data, nextOffset: getNextOffset(pagination, totalCount) };
    });
}
