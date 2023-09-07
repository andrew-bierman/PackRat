import { UnableToEditMapError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import Map from '../../models/mapsModel';

/**
 * Edits a map by updating the map details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated map object.
 */
export const editMap = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const newMap = await Map.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    })

    res.locals.data = newMap;
    responseHandler(res);
  } catch (error) {
    next(UnableToEditMapError);
  }
};
