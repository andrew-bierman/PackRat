import { z } from 'zod';

export const getItemByName = z.object({
  name: z.string(),
});

export const getItems = z.object({
  packId: z.string().optional(),
});

export const getItemById = z.object({
  id: z.string(),
});

export const addItem = z.object({
  name: z.string(),
  weight: z.number(),
  quantity: z.number().int().positive(),
  unit: z.string(),
  packId: z.string(),
  type: z.string(),
  ownerId: z.string(),
  id: z.string().optional(),
});

export const importItem = z.object({
  content: z.string(),
  packId: z.string(),
  ownerId: z.string(),
});

export type Item = z.infer<typeof addItem>;

export const editItem = z.object({
  id: z.string(),
  name: z.string().nonempty(),
  weight: z.number(),
  quantity: z.number(),
  unit: z.string(),
  type: z.string(),
  packId: z.string(),
});

export const addGlobalItemToPack = z.object({
  packId: z.string(),
  itemId: z.string(),
  ownerId: z.string(),
  quantity: z.number().int().positive(),
});

export const deleteGlobalItem = z.object({
  itemId: z.string(),
});

export const editGlobalItemAsDuplicate = z.object({
  itemId: z.string(),
  packId: z.string(),
});

export const deleteItem = z.object({
  itemId: z.string(),
  packId: z.string(),
});

export const addItemGlobal = z.object({
  name: z.string(),
  weight: z.number(),
  unit: z.string(),
  type: z.enum(['Food', 'Water', 'Essentials']),
  ownerId: z.string(),
  sku: z.string().optional(),
  productUrl: z.string().optional(),
  description: z.string().optional(),
  productDetails: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
  seller: z.string().optional(),
  image_urls: z.string().optional(),
});

export type AddItemGlobalType = z.infer<typeof addItemGlobal>;

export const importItemsGlobal = z.object({
  content: z.string(),
  ownerId: z.string(),
});

export const getItemsGlobally = z.object({
  limit: z.number(),
  page: z.number(),
});

export const getSimilarItems = z.object({
  id: z.string(),
  limit: z.number(),
});

export const importItemHeaders = z.object({
  Name: z.string(),
  Weight: z.string(),
  Unit: z.string(),
  Quantity: z.string(),
  Category: z.string(),
});

export type ImportItemHeaders = z.infer<typeof importItemHeaders>;
