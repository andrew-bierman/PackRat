import { getPhotonResultsService } from '../../services/osm/getPhotonResultsService';
import { responseHandler } from '../../helpers/responseHandler';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { type Context } from 'hono';

export async function getPhotonResults(ctx: Context) {
  try {
    const { searchString } = await ctx.req.query();
    const response = await getPhotonResultsService(searchString);
    return ctx.json(response.features, 200)
  } catch (error) {
    return ctx.json({error: error.message}, 500)
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
