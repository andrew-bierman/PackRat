import Trip from '../../models/tripModel'

/**
 * Retrieves trips belonging to a specific owner.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object[]>} The trips owned by the specified owner.
 */
export const getTripsService = async (ownerId: string): Promise<object[]> => {
  try {
    const trips = await Trip.find({ owner_id: ownerId }).populate('packs')

    return trips
  } catch (error) {
    console.error(error)
    throw new Error('Trips cannot be found')
  }
}
