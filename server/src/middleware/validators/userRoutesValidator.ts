import { z } from 'zod';

export const userSignUp = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});

export const userSignIn = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const getUserById = z.object({
  userId: z.string(),
});

export const sentEmail = z.object({
  email: z.string().email(),
});

export const resetPassword = z.object({
  resetToken: z.string(),
  password: z.string(),
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

export const getFirebaseUserByEmail = z.object({
  email: z.string().email(),
});

export const login = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const checkCode = z.object({
  email: z.string().email(),
  code: z.string(),
});

export const emailExists = z.object({
  email: z.string().email(),
});

export const updatePassword = z.object({
  email: z.string().email(),
  password: z.string(),
});
