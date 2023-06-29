import mongoose from "mongoose";
import Pack from "./packModel.js";
import Trip from "./tripModel.js";
import myDB from "./dbConnection.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, CLIENT_URL } from "../config.js";
import validator from "validator";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    password: {
      type: String,
      trim: true,
      minLength: 7,
      required: true,
      validate(value) {
        if (value.search(/password/i) !== -1)
          throw new Error("The password cannot contain the word 'password'");
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is invalid");
      },
    },
    token: {
      type: String,
      trim: true,
    },
    googleId: { type: String },
    code: { type: String },
    is_certified_guide: { type: Boolean },
    trips: [{ type: Schema.Types.ObjectId, ref: Trip }],
    favorites: [{ type: Schema.Types.ObjectId, ref: Pack }],
    packs: [{ type: Schema.Types.ObjectId, ref: Pack }],
    passwordResetToken: { type: String },
    passwordResetTokenExpiration: { type: Date },
  },
  { timestamps: true }
);

UserSchema.statics.findByCredentials = async function ({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User does not exists");

  const isMatch = await bycrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Unable to login");

  return user;
};

UserSchema.statics.alreadyLogin = async function (email) {
  const user = await User.findOne({ email });
  if (user) throw new Error("Already email registered");
};

UserSchema.statics.validateResetToken = async function (token) {
  const decoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) throw new Error("Invalid token");
    return decoded;
  });

  const user = await User.findOne({
    _id: decoded._id,
    passwordResetToken: token,
  });

  if (!user) throw new Error("User not Found");

  return user;
};

//password to store the in hash map
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password"))
    user.password = await bycrypt.hash(user.password, 8);

  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
    expiresIn: "7 days",
  });
  user.token = token;
  await user.save();
  return token;
};

UserSchema.methods.generateResetToken = async function () {
  const user = this;
  if (user.passwordResetToken) {
    const decoded = jwt.verify(user.passwordResetToken, JWT_SECRET);
    if (decoded._id) return user.passwordResetToken;
  }
  const resetToken = await jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
    expiresIn: "12h",
  });
  user.passwordResetToken = resetToken;
  await user.save();
  return `${CLIENT_URL}/password-reset?token=${resetToken}`;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.passwordResetToken;

  return userObject;
};

const User = myDB.model("User", UserSchema);

export default User;
