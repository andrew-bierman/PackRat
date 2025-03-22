import mongoose, { Schema, type Document, type Model } from 'mongoose';
import myDB from './dbConnection';
import bcrypt from 'bcryptjs';
import * as jwt from 'hono/jwt';
// import { JWT_SECRET, CLIENT_URL } from '../config';

// Dummy implementation of config
const JWT_SECRET = 'dummy_jwt_secret';
const CLIENT_URL = 'http://localhost:4200';

import validator from 'validator';

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  token: string;
  googleId?: string;
  code?: string;
  is_certified_guide?: boolean;
  favorites: any;
  passwordResetToken?: string;
  passwordResetTokenExpiration?: Date;
  role: 'user' | 'admin';
  username: string;
  profileImage?: string;
  preferredWeather?: string;
  preferredWeight?: string;
  generateAuthToken: () => Promise<string>;
  generateResetToken: () => Promise<string>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: {
      type: String,
      trim: true,
      minLength: 7,
      required: true,
      validate(value: string) {
        if (value.search(/password/i) !== -1) {
          throw new Error("The password cannot contain the word 'password'");
        }
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate(value: string) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid');
      },
    },
    token: {
      type: String,
      trim: true,
    },
    googleId: { type: String },
    code: { type: String },
    is_certified_guide: { type: Boolean },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Pack' }],
    // trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    // packs: [{ type: Schema.Types.ObjectId, ref: "Pack" }],
    passwordResetToken: { type: String },
    passwordResetTokenExpiration: { type: Date },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate(value: string) {
        if (!validator.isAlphanumeric(value)) {
          throw new Error('Username is invalid');
        }
      },
    },
    profileImage: {
      type: String,
    },
    preferredWeather: {
      type: String,
    },
    preferredWeight: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.statics.findByCredentials = async function ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IUser> {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login');
  return user;
};

UserSchema.statics.alreadyLogin = async function (
  email: string,
): Promise<void> {
  const user = await User.findOne({ email });
  if (user) throw new Error('Already email registered');
};

UserSchema.statics.validateResetToken = async function (
  token: string,
): Promise<IUser> {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  const decoded: any = await jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({
    id: decoded.id,
    passwordResetToken: token,
  });

  if (!user) throw new Error('User not Found');

  return user;
};

UserSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (!user.username) {
    let generatedUsername = user.email
      ? user.email.split('@')[0]
      : 'packratuser';

    const exists = await User.exists({ username: generatedUsername });

    let counter = 1;
    while (exists) {
      generatedUsername = `${generatedUsername}${counter}`;
      counter++;
    }
    if (generatedUsername) {
      user.username = generatedUsername;
    } else {
      throw new Error('generatedUsername is not defined');
    }
  }

  next();
});

UserSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this;
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  const token = await jwt.sign({ id: user.id.toString() }, JWT_SECRET);
  user.token = token;
  await user.save();
  return token;
};

UserSchema.methods.generateResetToken = async function (): Promise<string> {
  const user = this;
  if (user.passwordResetToken) {
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    const decoded: any = await jwt.verify(user.passwordResetToken, JWT_SECRET);
    if (decoded.id) return user.passwordResetToken;
  }
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  const resetToken = await jwt.sign({ id: user.id.toString() }, JWT_SECRET);
  user.passwordResetToken = resetToken;
  await user.save();
  return `${CLIENT_URL}/password-reset?token=${resetToken}`;
};

UserSchema.virtual('packs', {
  ref: 'Pack',
  localField: '_id',
  foreignField: 'owner_id',
  justOne: false,
});

UserSchema.virtual('trips', {
  ref: 'Trip',
  localField: '_id',
  foreignField: 'owner_id',
  justOne: false,
});

/**
 * Returns a partial representation of the user object, without the password and passwordResetToken fields.
 *
 * @returns {Partial<IUser>} A partial representation of the user object.
 */
UserSchema.methods.toJSON = function (): Partial<IUser> {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.passwordResetToken;

  return userObject;
};

const User: Model<IUser> = myDB.model<IUser>('User', UserSchema);

export default User;
