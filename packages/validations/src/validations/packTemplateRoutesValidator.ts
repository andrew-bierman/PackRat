import { z } from 'zod';

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
] as const);

export const createPackFromTemplate = z.object({
  packTemplateId: z.string().min(1),
  newPackName: z.string().min(1),
});

export const addPackTemplate = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),
  itemPackTemplates: z.array(
    z.object({
      itemId: z.string(),
      quantity: z.number(),
    }),
  ),
});

export const addPackTemplates = z.array(addPackTemplate);
