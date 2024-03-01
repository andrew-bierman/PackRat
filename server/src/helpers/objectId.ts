import mongoose from "mongoose";
export function convertCursorToObjectId(cursor: number): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(cursor);
  }