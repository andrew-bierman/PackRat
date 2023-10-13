import { publicProcedure } from '../../trpc';
import { PackNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPackByIdService } from '../../services/pack/pack.service';
import * as validator from '../../middleware/validators/index';
/**
 * Retrieves a pack by its ID and returns it as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The pack object as a JSON response.
 */
export const getPackById = async (c, next) => {
  try {
    const { packId } = c.req.param();

    const pack = await getPackByIdService(packId);

    res.locals.data = pack;
    responseHandler(c);
  } catch (error) {
    next(PackNotFoundError);
  }
};

export function getPackByIdRoute() {
  return publicProcedure.input(validator.getPackById).query(async (opts) => {
    const { packId } = opts.input;
    return await getPackByIdService(packId);
  });
}
