import { z } from 'zod';

const JoiObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/g);

export const getParks = z.object({
  abbrState: z.string(),
});
