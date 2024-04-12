import { z } from 'zod';

export const getTrailsOSM = z.object({
  lat: z.number(),
  lon: z.number(),
  radius: z.number(),
});

export const getPhotonResults = z.object({
  searchString: z.string(),
});

export const getParksOSM = z.object({
  lat: z.number(),
  lon: z.number(),
  radius: z.number(),
});
