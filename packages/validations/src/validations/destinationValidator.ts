import { z } from 'zod';

export const getDestinationByid = z.object({
  id: z.string(),
});
