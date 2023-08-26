import { UnableToDeleteTripError } from "../../helpers/errors";
import Trip from "../../models/tripModel";

/**
 * Deletes a trip from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a JSON object containing a success message if the trip was deleted successfully, or an error message if the trip could not be deleted.
 */
export const deleteTrip = async (req, res,next) => {
  try {
    const { tripId } = req.body;

    await Trip.findOneAndDelete({ _id: tripId });
    res.status(200).json({ msg: 'trip was deleted successfully' });
  } catch (error) {
   next(UnableToDeleteTripError)
  }
};
