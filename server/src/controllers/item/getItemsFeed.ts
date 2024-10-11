import { getPaginationResponse } from 'src/helpers/pagination';
import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import { getItemsFeedService } from 'src/services/item/getItemsFeedService';

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
      const { data, totalCount } = await getItemsFeedService({
        searchTerm,
        pagination,
      });
      return {
        data,
        ...getPaginationResponse(pagination, totalCount as number),
      };
    });
}
