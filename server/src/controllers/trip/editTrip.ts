import Trip from '../../models/tripModel';

/**
 * Edits a trip by updating the trip details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated trip object.
 */
export const editTrip = async (req, res) => {
  try {
    const { _id } = req.body;

    const newTrip = await Trip.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    }).populate('packs');

    res.status(200).json(newTrip);
  } catch (error) {
    res.status(404).json({ msg: 'Unable to edit trip' });
  }
};
