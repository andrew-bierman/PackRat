import { z } from 'zod';

export const getPackTemplate = z.object({
  id: z.string().min(1),
});

export const createPackFromTemplate = z.object({
  id: z.string().min(1),
});
