import Pack from '../../models/packModel';

/**
 * Deletes a pack by its ID.
 *
 * @param {string} packId - The ID of the pack to be deleted.
 * @return {Object} - An object containing a message indicating the success of the deletion.
 */
export const deletePackService = async (packId) => {
  await Pack.findOneAndDelete({ _id: packId });

  return { message: 'pack was deleted successfully' };
};
