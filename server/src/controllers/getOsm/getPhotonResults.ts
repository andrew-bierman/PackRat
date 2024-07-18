import { getPhotonResultsService } from '../../services/osm/getPhotonResultsService';
import { responseHandler } from '../../helpers/responseHandler';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { type Context } from 'hono';

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
