import Item from "../../models/itemModel";

/**
 * Retrieves an item from the database by its ID.
 *
 * @param {_id} _id - The ID of the item to retrieve.
 * @return {Promise<Object>} The retrieved item.
 */
export const getItemByIdService = async (_id) => {
    const item = await Item.findById({ _id });
  
    return item;
  };