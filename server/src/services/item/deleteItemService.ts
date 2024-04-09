import Item from '../../models/itemModel';
import Pack from '../../models/packModel';

/**
 * Deletes an item from the database.
 *
 * @param {string} itemId - The ID of the item to be deleted.
 * @param {string} packId - The ID of the pack that the item belongs to.
 * @return {Promise<object>} - The deleted item object.
 */
export const deleteItemService = async (itemId, packId) => {
  let itemDeleted;

  const item = await Item.findById(itemId);

  if (!item) {
    throw new Error(`No item found with id: ${itemId}`);
  }

  if (item.global) {
    await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });

    await Item.updateOne(
      {
        _id: itemId,
      },
      {
        $pull: {
          packs: packId,
        },
      },
    );

    itemDeleted = await Item.findById(itemId);
  } else {
    itemDeleted = await Item.findByIdAndDelete({ _id: itemId });
  }

  return itemDeleted;
};
