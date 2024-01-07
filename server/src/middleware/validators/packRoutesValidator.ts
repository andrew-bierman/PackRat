import { z } from 'zod';

export const getPacks = z.object({
  ownerId: z.string().min(1),
  queryBy: z.string().optional(),
});

export const getPackById = z.object({
  packId: z.string().min(1),
});

export const addPack = z.object({
  name: z.string().nonempty(),
  owner_id: z.string().min(1),
  is_public: z.boolean(),
});

export const editPack = z.object({
  id: z.string().min(1),
  name: z.string().nonempty(),
  is_public: z.boolean(),
});

export const deletePack = z.object({
  packId: z.string().min(1),
});

export const duplicatePublicPack = z.object({
  packId: z.string().min(1),
  ownerId: z.string().min(1),
  items: z.array(z.record(z.any())),
});
