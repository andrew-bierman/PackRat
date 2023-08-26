/**
 * Updates the database with GeoJSON data from Overpass.
 * @param {Object} data - The GeoJSON data to update the database with.
 * @return {Promise} A Promise that resolves when the database is updated successfully.
 */
export const updateDatabaseWithGeoJSONDataFromOverpass = async (data) => {
      if (!data) {
        throw new Error("No data provided");
      }
  
      // TEMPORARY: Commenting due to performance issues
      // const results = await findOrCreateMany(Way, data.features);
  
      // console.log("results", results);
    
  };