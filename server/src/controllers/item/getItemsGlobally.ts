import { publicProcedure } from '../../trpc';
import { ItemNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getItemsGloballyService } from '../../services/item/item.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

/**
 * Retrieves globally available items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The items, page, and total pages.
 */
export const getItemsGlobally = async (req, res, next) => {
  try {
    const result = await getItemsGloballyService(req.query.limit, req.query.page);

    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(ItemNotFoundError);
  }
};

export function getItemsGloballyRoute() {
  return publicProcedure.input(z.object({ limit: z.number(), page: z.number() })).query(async (opts) => {
    try {
      return await getItemsGloballyService(opts.input.limit, opts.input.page);
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: ItemNotFoundError.message });
    }
  })
}