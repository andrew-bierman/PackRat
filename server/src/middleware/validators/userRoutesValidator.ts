import { z } from 'zod';
import { Request } from 'express';

const JoiObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/g);

export const userSignUp = z.object({
  name: z.string().min(1).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
  username: z.string().nonempty(),
});

export const userSignIn = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const getUserById = z.object({
  userId: JoiObjectId.nonempty(),
});

export const sentEmail = z.object({
  email: z.string().email().nonempty(),
});

export const resetPassword = z.object({
  resetToken: z.string().nonempty(),
  password: z.string().nonempty(),
});

enum UserRoles {
  user = 'user',
  admin = 'admin',
}

export const addToFavorite = z.object({
  packId: JoiObjectId.nonempty(),
  userId: JoiObjectId.nonempty(),
});

export const editUser = z.object({
  userId: JoiObjectId.nonempty(),
  name: z.string(),
  password: z.string(),
  email: z.string(),
  token: z.string().optional(),
  code: z.string().optional(),
  googleId: z.string().optional(),
  is_certified_guide: z.boolean().optional(),
  passwordResetToken: z.string().optional(),
  passwordResetTokenExpiration: z.date().nullable().optional(),
  role: z.nativeEnum(UserRoles).optional(),
  username: z
    .string()
    .refine((value) => value.length > 0)
    .optional(),
  profileImage: z.string().optional(),
  preferredWeather: z.string().optional(),
  preferredWeight: z.string().optional(),
  favourite_ids: z.array(JoiObjectId.nonempty()).optional(),
  pack_ids: z.array(JoiObjectId.nonempty()).optional(),
  item_id: JoiObjectId.nonempty().nullable().optional(),
  template_ids: z.array(JoiObjectId.nonempty()).optional(),
  trip_ids: z.array(JoiObjectId.nonempty()).optional(),
});

export const deleteUser = z.object({
  userId: JoiObjectId.nonempty(),
});

export const linkFirebaseAuth = z.object({
  firebaseAuthToken: z.string().nonempty(),
});

export const createMongoDBUser = z.object({
  email: z.string().email().nonempty(),
  name: z.string().min(1).nonempty(),
  password: z.string().nonempty(),
});

export const getFirebaseUserByEmail = z.object({
  email: z.string().email().nonempty(),
});

export const login = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const checkCode = z.object({
  email: z.string().email().nonempty(),
  code: z.string().nonempty(),
});

export const emailExists = z.object({
  email: z.string().email().nonempty(),
});

export const updatePassword = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
