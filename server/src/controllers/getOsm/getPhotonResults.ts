import { getPhotonResultsService } from '../../services/osm/getPhotonResultsService';
import {
  InvalidRequestParamsError,
  RetrievingPhotonDetailsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure, protectedProcedure } from '../../trpc';
import { z } from 'zod';
// import * as validators from '@packrat/validations';
import * as validator from '@packrat/validations';
import { type Context } from 'hono';

/**
 * Retrieves Photon results based on a search string.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {undefined} There is no explicit return value.
 */
// export const getPhotonResults = async (req, res, next) => {
//   const { searchString } = req.query;
//   if (!searchString) {
//     next(InvalidRequestParamsError);
//   }
//   try {
//     const resultsArray = await getPhotonResultsService(searchString);
//     res.locals.data = resultsArray.data.features;
//     responseHandler(res);
//   } catch (error) {
//     next(RetrievingPhotonDetailsError);
//   }
// };

export async function getPhotonResults(ctx: Context) {
  try {
    const { searchString } = await ctx.req.query();
    const response = await getPhotonResultsService(searchString);
    if (!response) {
      ctx.set('data', { data: 'No Phontons Found' });
      return await responseHandler(ctx);
    }
    ctx.set('data', { data: response.features });
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function getPhotonResultsRoute() {
  return protectedProcedure
    .input(validator.getPhotonResults)
    .query(async (opts) => {
      const response = await getPhotonResultsService(opts.input.searchString);
      return response.features;
    });
}
