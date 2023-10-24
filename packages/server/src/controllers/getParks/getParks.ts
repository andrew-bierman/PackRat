import { publicProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import * as validators from '@packrat/packages';
import { getParksService } from '../../services/parks/getParksService';

const fetch = async (...args) =>
  import('node-fetch').then(async ({ default: fetch }) =>
    fetch(...(args as Parameters<typeof fetch>)),
  );

/**
 * Retrieves a list of parks based on the specified state code.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the park data or an error message.
 */
export const getParks = async (req, res, next) => {
  const json = await getParksService(req.query.abbrState);
  res.locals.data = json;
  responseHandler(res);
};

export function getParksRoute() {
  return publicProcedure.input(validators.getParks).query(async (opts) => {
    return await getParksService(opts.input.abbrState);
  });
}
