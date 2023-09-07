import Map from "../../models/mapsModel";


/**
 * Retrieves maps belonging to a specific owner.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object[]>} The maps owned by the specified owner.
 */
export const getMapsService = async (ownerId: string): Promise<object[]> => {
  try {
    const maps = await Map.find({ owner_id: ownerId })

    return maps;
  } catch (error) {
    console.error(error);
    throw new Error('Maps cannot be found');
  }
};
