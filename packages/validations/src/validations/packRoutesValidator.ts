import { z } from 'zod';
import JoiObjectId from './objectIdValidator';

export const getPacks = z.object({
  ownerId: JoiObjectId(),
  queryBy: z.string().optional(),
});

export const getPackById = z.object({
  packId: JoiObjectId(),
});

export const addPack = z.object({
  name: z.string().nonempty(),
  owner_id: JoiObjectId(),
  is_public: z.boolean(),
});

export const editPack = z.object({
  id: JoiObjectId(),
  name: z.string().nonempty(),
  is_public: z.boolean(),
});

export const deletePack = z.object({
  packId: JoiObjectId(),
});

export const duplicatePublicPack = z.object({
  packId: JoiObjectId(),
  ownerId: JoiObjectId(),
  items: z.array(z.object({})),
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
