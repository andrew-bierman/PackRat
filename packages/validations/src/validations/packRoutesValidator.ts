import { z } from 'zod';

export const getPacks = z.object({
  ownerId: z.string(),
  queryBy: z.string().optional(),
});

export const getPackById = z.object({
  packId: z.string(),
});

export const addPack = z.object({
  name: z.string().min(3).max(40),
  owner_id: z.string(),
  is_public: z.boolean(),
});

export const editPack = z.object({
  id: z.string(),
  name: z.string().min(3).max(40),
  is_public: z.boolean(),
});

export const deletePack = z.object({
  packId: z.string(),
});

export const getPublicPacks = z.object({
  queryBy: z.string(),
});

export const sendMessage = z.object({
  message: z.string().nonempty(),
});

export const addPackSchema = z.object({
  name: z.string().nonempty(),
  isPublic: z.union([z.literal('0'), z.literal('1')]),
});

export const duplicatePublicPack = z.object({
  packId: z.string(),
  ownerId: z.string(),
  items: z.array(z.string()),
});

export const getSimilarPacks = z.object({
  id: z.string(),
  limit: z.number(),
});
