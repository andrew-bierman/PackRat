import { z } from 'zod';

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

export const addToFavorite = z.object({
  packId: JoiObjectId.nonempty(),
  userId: JoiObjectId.nonempty(),
});

export const editUser = z.object({
  userId: JoiObjectId.nonempty(),
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

export const userSettingsSchema = z.object({
  name: z.string().min(1).nonempty(),
  email: z.string().email().nonempty(),
  username: z.string().nonempty(),
  profileImage: z.string().optional(),
  preferredWeather: z.union([z.literal('celsius'), z.literal('fahrenheit')]),
  preferredWeight: z.union([
    z.literal('lb'),
    z.literal('oz'),
    z.literal('kg'),
    z.literal('g'),
  ]),
});

export const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirmation must match',
    path: ['confirmPassword'], // This will attach the error to `passwordConfirm` field
  });
