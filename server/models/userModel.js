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
  firebaseUid: { type: String },
  code: { type: String },
  trips: [{ type: Schema.Types.ObjectId, ref: Trip }],
  is_certified_guide: { type: Boolean },
  favorites: [{ type: Schema.Types.ObjectId, ref: Pack }],
});

const User = myDB.model("User", UserSchema);
export default User;