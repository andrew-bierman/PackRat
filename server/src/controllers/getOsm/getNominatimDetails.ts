import {
  ErrorProcessingNominatimError,
  ErrorRetrievingNominatimError,
  InvalidRequestParamsError,
} from '../../helpers/errors';

export const getNominatimDetails = async (c) => {
  const { lat, lon, place_id } = c.req.query();

  let nominatimUrl = '';

  if (place_id) {
    nominatimUrl = `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${place_id}&addressdetails=1`;
  } else if (lat && lon) {
    nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  } else {
    c.next(InvalidRequestParamsError);
  }
  try {
    const response = await fetch(nominatimUrl);

    if (response.ok) {
      c.json({ response }, 200);
    } else {
      c.next(ErrorProcessingNominatimError);
    }
  } catch (error) {
    c.next(ErrorRetrievingNominatimError);
  }
};
