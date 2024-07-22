import { z } from 'zod';

const emailValidator = z
  .string({ required_error: 'Email is required' })
  .email()
  .transform((str) => str.trim().toLowerCase());

const passwordValidator = z
  .string({ required_error: 'Password is required' })
  .min(7)
  .refine((str) => !str.includes('password'), {
    message: `The password cannot contain the word 'password'`,
  });

export const userSignUp = z.object({
  name: z.string().min(1).nonempty(),
  email: emailValidator,
  password: passwordValidator,
  username: z.string().nonempty(),
});

export const userSignIn = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const sentEmail = z.object({
  email: emailValidator,
});

export const resetPassword = z.object({
  resetToken: z.string().nonempty(),
  password: passwordValidator,
});

export const getFirebaseUserByEmail = z.object({
  email: emailValidator,
});

export const checkCode = z.object({
  email: emailValidator,
  code: z.string().nonempty(),
});

export const emailExists = z.object({
  email: emailValidator,
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
  password: passwordValidator.optional(),
  email: z.string().optional(),
  code: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
  username: z.string().optional(),
  profileImage: z.string().optional().nullable(),
  preferredWeather: z.string().optional(),
  preferredWeight: z.string().optional(),
});

export const deleteUser = z.object({
  userId: z.string(),
});

export const deleteUserForm = z.object({
  confirmText: z.literal('delete'),
});

export const linkFirebaseAuth = z.object({
  firebaseAuthToken: z.string(),
});

export const createMongoDBUser = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: passwordValidator,
});

export const login = z.object({
  email: z.string().email(),
  password: passwordValidator,
});

export const updatePassword = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const userSettingsSchema = z.object({
  name: z.string().min(1).nonempty(),
  email: emailValidator,
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
    oldPassword: passwordValidator,
    newPassword: passwordValidator,
    confirmPassword: passwordValidator,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirmation must match',
    path: ['confirmPassword'], // This will attach the error to `passwordConfirm` field
  });
