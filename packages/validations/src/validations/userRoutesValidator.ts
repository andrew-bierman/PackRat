import { z } from 'zod';

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

export const sentEmail = z.object({
  email: z.string().email().nonempty(),
});

export const resetPassword = z.object({
  resetToken: z.string().nonempty(),
  password: z.string().nonempty(),
});

export const getFirebaseUserByEmail = z.object({
  email: z.string().email().nonempty(),
});

export const checkCode = z.object({
  email: z.string().email().nonempty(),
  code: z.string().nonempty(),
});

export const emailExists = z.object({
  email: z.string().email().nonempty(),
});

export const getUserById = z.object({
  userId: z.string().nonempty(),
});

export const addToFavorite = z.object({
  packId: z.string(),
  userId: z.string(),
});

export const editUser = z.object({
  id: z.string(),
  name: z.string().optional(),
  password: z.string().optional(),
  email: z.string().optional(),
  code: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
  username: z.string().optional(),
  profileImage: z.string().optional(),
  preferredWeather: z.string().optional(),
  preferredWeight: z.string().optional(),
});

export const deleteUser = z.object({
  userId: z.string(),
});

export const linkFirebaseAuth = z.object({
  firebaseAuthToken: z.string(),
});

export const createMongoDBUser = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string(),
});

export const login = z.object({
  email: z.string().email(),
  password: z.string(),
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
