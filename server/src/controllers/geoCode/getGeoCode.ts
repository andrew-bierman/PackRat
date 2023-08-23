const fetch = (...args: Parameters<typeof fetch>) => import('node-fetch').then(({default: fetch}) => fetch(...args as Parameters<typeof fetch>));
import { ErrorFetchingGeoCodeError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import { oneEntity } from "../../utils/oneEntity";

/**
 * Retrieves the geocode for a given address array.
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.addressArray - The address array to retrieve the geocode for.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the geocode is retrieved and the response is sent.
 */
export const getGeoCode = async (req, res,next) => {
  let addressArray = await oneEntity(req.query.addressArray);
  const transform = addressArray.split(", ").join("%20").split(" ").join("%20");

  const GEO_CODE_URL = process.env.GEO_CODE_URL;
  const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

  let params = `?`;

  if (addressArray) params += `text=${transform}`;

  const api_key = `&apiKey=${GEOAPIFY_KEY}`;

  params += api_key;

  const url = GEO_CODE_URL + params;

  await fetch(url)
    .then((response) => response.json())
    .then((result) => {
      res.locals.data = result;
      responseHandler(res);
    })
    .catch(() => next(ErrorFetchingGeoCodeError));
};
 