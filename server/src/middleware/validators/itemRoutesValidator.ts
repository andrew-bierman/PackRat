import { z } from 'zod';

// const JoiObjectId = (message: any = 'valid id'): z.ZodString =>
//   z.string().regex(/^[0-9a-fA-F]{24}$/, { message });

export const getItems = z.object({
  packId: z.string().optional(),
});

export const getItemById = z.object({
  id: z.string(),
});

export const addItem = z.object({
  name: z.string(),
  weight: z.number(),
  quantity: z.number(),
  unit: z.string(),
  packId: z.string(),
  type: z.string(),
  ownerId: z.string(),
});

export const editItem = z.object({
  id: z.string(),
  name: z.string().optional(),
  weight: z.number().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  type: z.string().optional(),
});

export type Item = z.infer<typeof addItem>;

export const deleteItem = z.object({
  itemId: z.string(),
  packId: z.string().optional(),
});

export const addItemGlobal = z.object({
  name: z.string(),
  weight: z.number(),
  quantity: z.number(),
  unit: z.string(),
  type: z.string(),
});
