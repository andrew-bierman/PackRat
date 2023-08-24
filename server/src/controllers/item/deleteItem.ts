import { deleteItemService } from '../../services/item/item.service'

/**
 * Deletes an item from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The deleted item.
 */

export const deleteItem = async (req, res) => {
  try {
    const { itemId, packId } = req.body

    const itemDeleted = await deleteItemService(itemId, packId)

    res.status(200).json(itemDeleted)
  } catch (error) {
    console.error(error)
    res.status(404).json({ msg: 'Unable to delete item' + error.message })
  }
}
