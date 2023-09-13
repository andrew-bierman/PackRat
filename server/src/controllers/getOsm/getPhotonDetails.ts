import {
  InvalidRequestParamsError,
  RetrievingPhotonDetailsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import * as validators from "@packrat/packages"
import { publicProcedure } from '../../trpc';
import { getPhotonDetailsService } from '../../services/osm/getPhotonDetailsService';

/**
 * Retrieves Photon details based on the provided ID and type.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
export const getPhotonDetails = async (req, res, next) => {
  let { id, type } = req.params;
  if (!id || !type) {
    next(InvalidRequestParamsError);
  }
  try {
    const result = await getPhotonDetailsService(id, type);
    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(RetrievingPhotonDetailsError);
  }
};


export function getPhotonDetailsRoute() {
  return publicProcedure.input(validators.getPhotonDetails).query(async (opts) => {
    let { id, type } = opts.input;
    return await getPhotonDetailsService(id, type);
  })
}
