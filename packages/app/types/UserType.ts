import { Types } from 'mongoose';

export type UserType = {
  name: string;
  password: string;
  email: string;
  token: string;
  googleId: string;
  code: string;
  is_certified_guide: boolean;
  favorites: Types.ObjectId[];
  // trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  // packs: [{ type: Schema.Types.ObjectId, ref: "Pack" }],
  passwordResetToken: string;
  passwordResetTokenExpiration: Date;
  role: 'user' | 'admin';
  username: string;
  profileImage: string;
  preferredWeather: string;
  preferredWeight: string;
};
