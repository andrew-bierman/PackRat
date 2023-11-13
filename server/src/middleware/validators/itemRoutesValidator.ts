import { z } from 'zod';

const JoiObjectId = (message: any = 'valid id'): z.ZodString =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, { message });

export const getItems = z.object({
  packId: JoiObjectId(),
});

export const getItemById = z.object({
  id: JoiObjectId(),
});

export const addItem = z.object({
  name: z.string().nonempty(),
  weight: z.number(),
  quantity: z.number(),
  unit: z.string().nonempty(),
  packId: JoiObjectId(),
  type: z.string().optional(),
  ownerId: z.string().optional(),
});

export const editItem = z.object({
  id: JoiObjectId(),
  name: z.string().nonempty(),
  weight: z.number(),
  quantity: z.number(),
  unit: z.string().nonempty(),
  type: z.string(),
});

export const deleteItem = z.object({
  itemId: JoiObjectId().nonempty(),
  packId: JoiObjectId().nonempty(),
});

export const addItemGlobal = z.object({
  name: z.string().nonempty(),
  weight: z.number(),
  quantity: z.number(),
  unit: z.string().nonempty(),
  type: z.string().optional(),
});
