import { publicProcedure, protectedProcedure } from '../../trpc';
import { getItemsGloballyService } from '../../services/item/item.service';
import { z } from 'zod';

/**
 * Retrieves globally available items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The items, page, and total pages.
 */

export function getItemsGloballyRoute() {
  return protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        page: z.number(),
        searchString: z.string().optional(),
      }),
    )
    .query(async (opts) => {
      const { limit, page, searchString } = opts.input;
      const result = await getItemsGloballyService(limit, page, searchString);
      return {
        ...result,
        items: result.items,
      };
    });
}
