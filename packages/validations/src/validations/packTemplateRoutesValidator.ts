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

export const getPackTemplate = z.object({
  id: z.string().min(1),
});

export const createPackFromTemplate = z.object({
  packTemplateId: z.string().min(1),
  newPackName: z.string().min(1),
});
