import Pack from '../../models/packModel';
import { prisma } from '../../prisma/index';

/**
 * Edits a pack in the service.
 *
 * @param {string} packId
 * @param {object} packData
 * @return {object}
 */
export const editPackService = async (packId, packData) => {
  const updatedPack = await prisma.pack.update({
    where: { id: packId },
    data: packData,
  });

  return updatedPack;
};
