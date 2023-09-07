import { UnableToDeleteMapError } from '../../helpers/errors';
import Map from '../../models/mapsModel';

/**
 * Deletes a map from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a JSON object containing a success message if the map was deleted successfully, or an error message if the map could not be deleted.
 */
export const deleteMap = async (req, res, next) => {
  try {
    const { mapId } = req.body;

    await Map.findOneAndDelete({ _id: mapId });
    res.status(200).json({ msg: 'map was deleted successfully' });
  } catch (error) {
    next(UnableToDeleteMapError);
  }
};
