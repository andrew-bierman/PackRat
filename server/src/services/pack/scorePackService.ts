import Pack from "../../models/packModel.ts";
import mongoose from "mongoose";
import { calculatePackScore } from "../../utils/scorePack.ts";

export async function scorePackService(packId: string) {
  try {
    const objectId = new mongoose.Types.ObjectId(packId);
    const packData = await Pack.findById(objectId).populate("items");

    const packScore = calculatePackScore(packData);

    const { scores, grades } = packScore;

    const updatedPack = await Pack.findByIdAndUpdate(
      { _id: packId },
      { scores: scores, grades: grades },
      { returnOriginal: false }
    );

    return updatedPack;
  } catch (error) {
    throw new Error("Unable to score pack: " + error.message);
  }
}