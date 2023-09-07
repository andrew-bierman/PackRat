import { UnableToAddMapError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { addMapService } from '../../services/map/addMapService';

/**
 * Adds a map to the database.
 * @param {Object} req - The request object containing the map details.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a success message or rejects with an error message.
 */
export const addMap = async (req, res, next) => {
  try {
    const { name, geoJSON, owner_id, is_public } = req.body;

    const mapDetails = {
      name,
      geoJSON,
      owner_id,
      is_public,
    };

    const result = await addMapService(mapDetails);

    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(UnableToAddMapError);
  }
};


