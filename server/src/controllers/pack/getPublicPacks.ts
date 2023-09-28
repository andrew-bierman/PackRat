import { publicProcedure } from '../../trpc';
import { PackNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPublicPacksService } from '../../services/pack/pack.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

/**
 * Retrieves public packs based on the given query parameter.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the retrieved public packs
 */
export const getPublicPacks = async (req, res, next) => {
  try {
    const { queryBy } = req.query;


    const publicPacks = await getPublicPacksService(queryBy);

    res.locals.data = publicPacks;
    responseHandler(res);
  } catch (error) {
    next(PackNotFoundError);
  }
};

export function getPublicPacksRoute() {
  return publicProcedure.input(z.object({ queryBy: z.string() })).query(async (opts) => {
    try {
      const { queryBy } = opts.input;
      return await getPublicPacksService(queryBy);
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: PackNotFoundError.message });
    }
  });
}