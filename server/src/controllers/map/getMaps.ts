import { MapNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getMapsService } from '../../services/map/getMapsService';


/**
 * Retrieves maps belonging to a specific owner.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The maps owned by the specified owner.
 */
export const getMaps = async (req, res, next) => {
  try {
    const { ownerId } = req.params;

    const maps = await getMapsService(ownerId);

    res.locals.data = maps;
    responseHandler(res);
  } catch (error) {
    next(MapNotFoundError);
  }
};
