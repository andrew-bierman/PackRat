import { z } from 'zod';

export const getFavoritePacksByUser = z.object({
  userId: z.string(),
});
