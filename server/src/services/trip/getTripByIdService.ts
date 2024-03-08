import Trip from '../../models/tripModel';

/**
 * Retrieves a trip by its ID and returns the trip details.
 * @param {string} tripId - The ID of the trip.
 * @return {Promise<object>} A promise that resolves to the trip details.
 */
export const getTripByIdService = async (tripId: string): Promise<object> => {
  try {
    const trip: any = await Trip.findById(tripId).populate({
      path: 'owner_id',
    });

    // If you need to populate additional fields, you can chain more populate methods here
    // .populate({ path: "osm_ref", populate: { path: "nodes" }})
    // .populate({ path: "packs", populate: { path: "items" } })

    // console.log('trip', trip);

    const tripObject = trip.toObject();
    tripObject.geojson = {
      type: 'FeatureCollection',
      features: tripObject.geojson,
    };

    // console.log('tripObject', tripObject);

    // return { ...trip._doc };

    return tripObject;
  } catch (error) {
    console.log("error", error);
    throw new Error('Trip cannot be found');
  }
};
