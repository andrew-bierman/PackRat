import {
  ErrorProcessingNominatimError,
  ErrorRetrievingNominatimError,
  InvalidRequestParamsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Retrieves Nominatim details based on the provided latitude, longitude, or place ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Returns nothing.
 */
export const getNominatimDetails = async (req, res, next) => {
  const { lat, lon, place_id } = req.query;

  let nominatimUrl = '';

  if (place_id) {
    nominatimUrl = `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${place_id}&addressdetails=1`;
  } else if (lat && lon) {
    nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  } else {
    next(InvalidRequestParamsError);
  }
  try {
    const response = await fetch(nominatimUrl);

    if (response.ok) {
      res.locals.data = await response.json();
      responseHandler(res);
    } else {
      console.log(response.status, response.statusText);
      next(ErrorProcessingNominatimError);
    }
  } catch (error) {
    next(ErrorRetrievingNominatimError);
  }
};
