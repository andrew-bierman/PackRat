import Trip from '../../models/tripModel';

/**
 * Retrieves a trip by its ID and returns the trip details.
 * @param {string} tripId - The ID of the trip.
 * @return {Promise<object>} A promise that resolves to the trip details.
 */
export const getTripByIdService = async (tripId: string): Promise<object> => {
  try {
    const trip: any = await Trip.findById(tripId)
      .populate('osm_ref')
      .populate({ path: 'owner_id' });

    // If you need to populate additional fields, you can chain more populate methods here
    // .populate({ path: "osm_ref", populate: { path: "nodes" }})
    // .populate({ path: "packs", populate: { path: "items" } })

    return { ...trip._doc, osm_ref: await trip.osm_ref.toJSON() };
  } catch (error) {
    console.error(error);
    throw new Error('Trip cannot be found');
  }
};
