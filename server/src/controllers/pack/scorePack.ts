import { scorePackService } from '../../services/pack/pack.service';

/**
 * Scores a pack by calculating its score and updating the pack object in the database.
 * @param {Object} req - The request object containing the packId parameter.
 * @param {Object} res - The response object used to send the response.
 * @return {Promise} A promise that resolves to the updated pack object or an error message.
 */
export const scorePack = async (req, res) => {
  try {
    const { packId } = req.params;

    const updatedPack = await scorePackService(packId);

    console.log('updatedPack', updatedPack);

    res.status(200).json({ msg: 'Pack was scored successfully', updatedPack });
  } catch (error) {
    console.log('error', error);
    res.status(404).json({ msg: 'Unable to score pack', error });
  }
};
