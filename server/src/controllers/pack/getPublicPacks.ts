import { publicProcedure } from '../../trpc';
import { PackNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPublicPacksService } from '../../services/pack/pack.service';
import { z } from 'zod';
import { QueryType } from '../../helpers/queryTypeEnum'

/**
 * Retrieves public packs based on the given query parameter.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the retrieved public packs
 */
export const getPublicPacks = async (req, res, next) => {
  try {
    const { queryBy, type, page, pageSize } = req.query;

    const publicPacks = await getPublicPacksService(queryBy, type, page, pageSize);

    res.locals.data = publicPacks;
    responseHandler(res);
  } catch (error) {
    next(PackNotFoundError);
  }
};

export function getPublicPacksRoute() {
  return publicProcedure
    .input(z.object({ queryBy: z.string(), type: z.string().optional(), page: z.number().optional(), pageSize: z.number().optional() }))
    .query(async (opts) => {
      const { queryBy, type = QueryType.Default, page, pageSize } = opts.input;
      return await getPublicPacksService(queryBy, page, pageSize, type);
    });
}
