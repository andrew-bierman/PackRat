import { publicProcedure, protectedProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import * as validators from '@packrat/validations';
import { getParksService } from '../../services/parks/getParksService';
import { type Context } from 'hono';

/**
 * Retrieves a list of parks based on the specified state code.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the park data or an error message.
 */
// export const getParks = async (req, res, next) => {
//   const json = await getParksService(req.query.abbrState);
//   res.locals.data = json;
//   responseHandler(res);
// };

export async function getParks(ctx: Context) {
  try {
    const { abbrState } = await ctx.req.json();
    const { env }: any = ctx;
    const response = await getParksService({
      abbrStates: abbrState,
      rapidApiKey: env.X_RAPIDAPI_KEY,
      npsApi: env.NPS_API,
      parksHost: env.PARKS_HOST,
    });
    return ctx.json(response, 200);
  } catch (error) {
    return ctx.json({ error: error.message }, 400);
  }
}

export function getParksRoute() {
  return protectedProcedure.input(validators.getParks).query(async (opts) => {
    const { abbrState } = opts.input;
    const { env }: any = opts.ctx;
    return await getParksService({
      abbrStates: abbrState,
      rapidApiKey: env.X_RAPIDAPI_KEY,
      npsApi: env.NPS_API,
      parksHost: env.PARKS_HOST,
    });
  });
}
