/**
 * Updates the database with GeoJSON data obtained from Overpass.
 * @param {Object} data - The GeoJSON data to be updated in the database.
 * @return {Promise} - A Promise that resolves when the update is complete.
 */
export const updateDatabaseWithGeoJSONDataFromOverpass = async (data) => {
    if (!data) {
      throw new Error('No data provided');
    }

    // TEMPORARY: Commenting due to performance issues
    // const results = await findOrCreateMany(Way, data.features);

    // console.log("results", results);
};
