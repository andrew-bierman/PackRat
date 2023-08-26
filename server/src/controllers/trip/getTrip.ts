import Trip from '../../models/tripModel';
import { getTripsService } from '../../services/trip/getTripsService';

/**
 * Retrieves trips belonging to a specific owner.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The trips owned by the specified owner.
 */
export const getTrips = async (req, res) => {
  try {
    const { ownerId } = req.packs;

    const trips = await getTripsService(ownerId);

    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: 'Trips cannot be found' });
  }
};
