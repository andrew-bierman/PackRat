import { z } from 'zod';
import JoiObjectId from './objectIdValidator';

export const getItems = z.object({
  packId: JoiObjectId(),
});

export const getItemById = z.object({
  _id: JoiObjectId(),
});

export const getItemByName = z.object({
  name: z.string(),
});

export const addItem = z.object({
  name: z.string().nonempty(),
  weight: z.string().nonempty(),
  quantity: z.string().nonempty(),
  unit: z.string().nonempty(),
  packId: JoiObjectId().nonempty(),
  type: z.string().optional(),
  ownerId: z.string().optional(),
});

export type Item = z.infer<typeof addItem>;

export const editItem = z.object({
  _id: JoiObjectId().nonempty(),
  name: z.string().nonempty(),
  weight: z.string().nonempty(),
  quantity: z.string().nonempty(),
  unit: z.string().nonempty(),
  type: z.string(),
});

export const deleteItem = z.object({
  itemId: JoiObjectId().nonempty(),
  packId: JoiObjectId().nonempty(),
});

export const addItemGlobal = z.object({
  name: z.string().nonempty(),
  weight: z.string().nonempty(),
  quantity: z.string().nonempty(),
  unit: z.string().nonempty(),
  type: z.string().optional(),
});

export const addGlobalItemToPack = z.object({
  packId: z.string(),
  itemId: z.string(),
  ownerId: z.string(),
});

export const deleteGlobalItem = z.object({
  itemId: z.string(),
});

export const editGlobalItemAsDuplicate = z.object({
  itemId: z.string(),
  packId: z.string(),
  name: z.string(),
  weight: z.number(),
  quantity: z.number(),
  unit: z.string(),
  type: z.string(),
});

export const getItemsGlobally = z.object({
  limit: z.number(),
  page: z.number(),
});
