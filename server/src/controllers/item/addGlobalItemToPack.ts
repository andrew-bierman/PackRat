import { addGlobalItemToPackService } from '../../services/item/item.service';

/**
 * Adds a global item to a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item.
 */
export const addGlobalItemToPack = async (req, res) => {
  try {
    const { packId } = req.params;
    const { itemId, ownerId } = req.body;

    const result = await addGlobalItemToPackService(packId, itemId, ownerId);

    res.status(200).json({ message: 'successfully updated', data: result });
  } catch (error) {
    res.status(404).json({ msg: 'Items cannot be found' });
  }
};
