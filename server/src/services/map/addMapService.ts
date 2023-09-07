import GeoJSON from '../../models/geojsonModel';
import Map from '../../models/mapsModel';

/**
 * Adds a map to the database.
 * @param {Object} mapDetails - The map details.
 * @return {Promise<string>} A promise that resolves to a success message.
 */
export const addMapService = async (mapDetails): Promise<string> => {
  try {
    const {
      name,
      geoJSON, 
      owner_id,
      is_public,
    } = mapDetails;

    // Save all the Features from the FeatureCollection
    // @ts-expect-error - getting typescript error here
    const savedGeoJSONs = await GeoJSON.saveMany(geoJSON.features);

    const geojsonIds = savedGeoJSONs.map((feature) => feature._id);


    const newMap = await Map.create({
      name,
      geojson: geojsonIds,
      owner_id,
      is_public,
    });

    // @ts-expect-error - getting typescript error here
    return { message: 'Map added successfully', map: newMap };
  } catch (error) {
    console.error(error);
    throw new Error('Unable to add map');
  }
};

