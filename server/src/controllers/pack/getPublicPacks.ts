import { publicProcedure } from '../../trpc';
import { PackNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPublicPacksService } from '../../services/pack/pack.service';
import { z } from 'zod';

/**
 * Retrieves public packs based on the given query parameter.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the retrieved public packs
 */
export const getPublicPacks = async (req, res, next) => {
  try {
    const { queryBy, pageNo, recordsPerPage } = req.query;

    const { publicPacks, page_no, records_per_page, totalRecords }: any =
      await getPublicPacksService(queryBy, pageNo, recordsPerPage);

    res.locals.data = publicPacks;
    res.locals.pageNo = page_no;
    res.locals.recordsPerPage = records_per_page;
    res.locals.totalRecords = totalRecords;
    responseHandler(res);
  } catch (error) {
    next(PackNotFoundError);
  }
};

export function getPublicPacksRoute() {
  return publicProcedure
    .input(
      z.object({
        queryBy: z.string(),
        pageNo: z.number().optional(),
        recordsPerPage: z.number().optional(),
      }),
    )
    .query(async (opts) => {
      const { queryBy, pageNo, recordsPerPage } = opts.input;
      return await getPublicPacksService(queryBy, pageNo, recordsPerPage);
    });
}
