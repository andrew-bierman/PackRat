import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import { getUserItemsService } from 'src/services/item/getUserItemsService';
export function getUserItemsRoute() {
  return protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        page: z.number(),
        searchString: z.string().optional(),
        ownerId: z.string(),
      }),
    )
    .query(async (opts) => {
      const { limit, page, searchString, ownerId } = opts.input;
      const result = await getUserItemsService(limit, page, {
        searchString,
        ownerId,
      });
      return {
        ...result,
        items: result.items,
      };
    });
}
