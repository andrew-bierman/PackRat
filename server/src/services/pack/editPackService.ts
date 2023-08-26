import Pack from '../../models/packModel';

/**
 * Edits a pack in the service.
 *
 * @param {string} packId - The ID of the pack to be edited.
 * @param {object} packData - The updated data for the pack.
 * @return {object} The updated pack object.
 */
export const editPackService = async (packId, packData) => {
  const updatedPack = await Pack.findOneAndUpdate({ _id: packId }, packData, {
    returnOriginal: false,
  });

  return updatedPack;
};
