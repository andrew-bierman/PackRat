import { z } from 'zod';

export const mapFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});
