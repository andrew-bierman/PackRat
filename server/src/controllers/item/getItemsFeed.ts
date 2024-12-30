import { getPaginationResponse } from '../../helpers/pagination';
import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import { getItemsFeedService } from '../../services/item/getItemsFeedService';

export function getItemsFeedRoute() {
  return protectedProcedure
    .input(
      z.object({
        queryBy: z.string(),
        searchTerm: z.string().optional(),
        pagination: z
          .object({ limit: z.number(), offset: z.number() })
          .optional(),
      }),
    )
    .query(async (opts) => {
      const { queryBy, searchTerm, pagination } = opts.input;
      const validPagination = pagination
        ? { limit: pagination.limit || 0, offset: pagination.offset || 0 }
        : { limit: 0, offset: 0 };
      const { data, totalCount } = await getItemsFeedService({
        queryBy,
        searchTerm,
        pagination: validPagination,
      });
      return {
        data,
        ...getPaginationResponse(validPagination, totalCount as number),
      };
    });
}
