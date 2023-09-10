import { z } from 'zod';

export const JoiObjectId = (message: any = 'valid id'): z.ZodString =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, { message });

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
  _id: JoiObjectId(),
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
