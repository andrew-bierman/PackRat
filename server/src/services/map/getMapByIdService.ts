import Map from '../../models/mapsModel';

/**
 * Retrieves a map by its ID and returns the map details.
 * @param {string} mapId - The ID of the map.
 * @return {Promise<object>} A promise that resolves to the map details.
 */
export const getMapByIdService = async (mapId: string): Promise<object> => {
  try {
    const map: any = await Map.findById(mapId).populate({
      path: 'owner_id',
    });

    const mapObject = map.toObject();
    mapObject.geojson = {
      type: 'FeatureCollection',
      features: mapObject.geojson,
    };

    return mapObject;
  } catch (error) {
    console.error(error);
    throw new Error('Map cannot be found');
  }
};
