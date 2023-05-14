import mongoose from "mongoose";
import Pack from "./packModel.js";
import Trip from "./tripModel.js";
import myDB from "./dbConnection.js";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String },
  email: {
    type: String, required: true, lowercase: true
  },
  googleId: { type: String },
  code: { type: String },
  is_certified_guide: { type: Boolean },
  trips: [{ type: Schema.Types.ObjectId, ref: Trip }],
  favorites: [{ type: Schema.Types.ObjectId, ref: Pack }],
  packs: [{ type: Schema.Types.ObjectId, ref: Pack }],
  passwordResetToken: { type: String },
  passwordResetTokenExpiration: { type: Date },
});

const User = myDB.model("User", UserSchema);
export default User;