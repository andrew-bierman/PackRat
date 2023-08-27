import Pack from '../../models/packModel';
import mongoose from 'mongoose';
import { calculatePackScore } from '../../utils/scorePack';

/**
 * Scores a pack service based on the given packId.
 *
 * @param {string} packId - The ID of the pack to be scored.
 * @return {Promise<Pack>} The updated pack object with scores and grades.
 * @throws {Error} If unable to score the pack.
 */
export async function scorePackService(packId: string) {
  try {
    const objectId = new mongoose.Types.ObjectId(packId);
    const packData = await Pack.findById(objectId).populate('items');

    const packScore = calculatePackScore(packData);

    const { scores, grades } = packScore;

    const updatedPack = await Pack.findByIdAndUpdate(
      { _id: packId },
      { scores, grades },
      { returnOriginal: false },
    );

    return updatedPack;
  } catch (error) {
    throw new Error('Unable to score pack: ' + error.message);
  }
}
