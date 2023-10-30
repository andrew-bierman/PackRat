import { trpc } from '../trpc';

export const processGeoJSON = async (data) => {
  try {
    return await trpc.postSingleGeoJSON.mutate({ geojson: data });
  } catch (err) {
    return 'Invalid request parameters for processGeoJSON';
  }
};

export const getDestination = async (destinationId) => {
  try {
    return await trpc.getDestination.query({ id: destinationId });
  } catch (err) {
    return 'Invalid request parameters for getDestination';
  }
};

export const photonDetails = async (data) => {
  try {
    const { properties } = data;
    const { osm_id, osm_type } = properties;
    // Check if `osm_id` or `osm_type` is missing
    if (!osm_id || !osm_type) {
      return 'Invalid request parameters for photonDetails';
    }

    return await trpc.getPhotonDetails.query({
      id: osm_id,
      type: osm_type,
    });
  } catch (err) {
    return 'Invalid request parameters for photonDetails';
  }
};
