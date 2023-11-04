import { z } from 'zod';

export const TokenSchema = z.object({
  _id: z.string(),
});
