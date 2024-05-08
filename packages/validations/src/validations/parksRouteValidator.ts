import { z } from 'zod';

export const getParks = z.object({
  abbrState: z.string(),
});
