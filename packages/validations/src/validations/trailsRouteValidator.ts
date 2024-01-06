import { z } from 'zod';

const JoiObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/g);

export const getTrails = z.object({
  administrative_area_level_1: z.string(),
  country: z.string(),
  locality: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
