import { MapNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getMapByIdService } from '../../services/map/getMapByIdService';

/**
 * Retrieves a map by its ID and returns the map details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the map details.
 */
export const getMapById = async (req, res, next) => {
  try {
    const { mapId } = req.params;

    const mapDetails = await getMapByIdService(mapId);

    res.locals.data = mapDetails;
    responseHandler(res);
  } catch (error) {
    next(MapNotFoundError);
  }
};
