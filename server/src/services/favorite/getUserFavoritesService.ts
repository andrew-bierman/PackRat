import User from '../../models/userModel';
import type { Document as MongooseDocument } from 'mongoose';
import type { ObjectId } from 'mongodb';
import { UserNotFoundError } from '../../helpers/errors';

type UserType = MongooseDocument & {
  favorites: ObjectId[];
};

export const getUserFavoritesService = async (userId, next) => {
  const user: UserType | null = await User.findById({ _id: userId }).populate(
    'favorites',
  );
  if (!user) next(UserNotFoundError);
  return user?.favorites;
};
