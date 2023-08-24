import Item from '../../models/itemModel'

/**
 * Retrieves items based on the given pack ID.
 *
 * @param {string} packId - The ID of the pack.
 * @return {Promise<Array<Object>>} An array of items.
 */
export const getItemsService = async (packId) => {
  const items = await Item.find({ packs: packId })

  return items
}
