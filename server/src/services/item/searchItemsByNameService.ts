import Item from '../../models/itemModel'

/**
 * Searches for items by name.
 *
 * @param {string} name - The name to search for.
 * @return {Promise<Array>} An array of items that match the search criteria.
 */
export const searchItemsByNameService = async (name) => {
  const items = await Item.find({
    name: { $regex: `.*${name}.*`, $options: 'i' }
  })

  return items
}
