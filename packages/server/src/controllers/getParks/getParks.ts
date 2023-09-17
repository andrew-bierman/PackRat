import { publicProcedure } from '../../trpc';
import { RetrievingParksDataError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { oneEntity } from '../../utils/oneEntity';
import * as validators from "@packrat/packages"
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
  const abbrState = await oneEntity(req.query.abbrState);

  const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
  const NPS_API = process.env.NPS_API;
  const PARKS_HOST = process.env.PARKS_HOST;

  const host = `${PARKS_HOST}?stateCode=${abbrState}`;

  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': `${NPS_API}`,
      'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
      'X-RapidAPI-Host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com',
      'User-Agent': 'PackRat',
    },
  };

  await fetch(host, options)
    .then(async (res) => await res.json())
    .then((json) => {
      res.locals.data = json;
      responseHandler(res);
    })
    .catch(() => next(RetrievingParksDataError));
};

export function getParksRoute() {
  return publicProcedure.input(validators.getParks).query(async (opts) => {
    const abbrState = await oneEntity(opts.input.abbrState);

    const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
    const NPS_API = process.env.NPS_API;
    const PARKS_HOST = process.env.PARKS_HOST;

    const host = `${PARKS_HOST}?stateCode=${abbrState}`;

    const options = {
      method: 'GET',
      headers: {
        'X-Api-Key': `${NPS_API}`,
        'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com',
        'User-Agent': 'PackRat',
      },
    };

    await fetch(host, options)
      .then(async (res) => await res.json())
      .then((json) => {
        return json
      })
      .catch(() => { throw RetrievingParksDataError })
  })
}