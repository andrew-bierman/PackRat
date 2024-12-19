import { z } from 'zod';
import { addItemGlobal } from './itemRoutesValidator';

export const getPackTemplates = z.object({
  filter: z
    .object({
      searchQuery: z.string().optional(),
    })
    .optional(),
  orderBy: z.string().optional(),
  pagination: z.object({
    offset: z.number(),
    limit: z.number(),
  }),
});

export const getPackTemplate = z.union([
  z.object({
    id: z.string().min(1),
    name: z.string().optional(),
  }),
  z.object({
    name: z.string(),
    id: z.string().optional(),
  }),
]);

export const createPackFromTemplate = z.object({
  packTemplateId: z.string().min(1),
  newPackName: z.string().min(1),
});

export const addPackTemplate = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),
  itemsOwnerId: z.string(),
  itemPackTemplates: z.array(
    z.object({
      item: addItemGlobal.omit({ ownerId: true }),
      quantity: z.number(),
    }),
  ),
});

export type AddPackTemplateType = z.infer<typeof addPackTemplate>;

export const addPackTemplates = z.array(addPackTemplate);
