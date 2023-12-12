import { z } from 'zod';

export const TokenSchema = z.object({
  id: z.string(),
});
