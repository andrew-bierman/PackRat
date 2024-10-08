import { z } from 'zod';

export const getPackTemplates = z
  .object({
    searchQuery: z.string(),
  })
  .optional();

export const getPackTemplate = z.object({
  id: z.string().min(1),
});

export const createPackFromTemplate = z.object({
  packTemplateId: z.string().min(1),
  newPackName: z.string().min(1),
});
