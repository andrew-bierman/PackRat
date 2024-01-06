import { z } from 'zod';

const JoiObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/g);

export const getOsm = z.object({
  activityType: z.string(),
  startPoint: z.object({ latitude: z.number(), longitude: z.number() }),
  endPoint: z.object({ latitude: z.number(), longitude: z.number() }),
});

export const getParksOSM = z.object({
  lat: z.number(),
  lon: z.number(),
  radius: z.number().optional(),
});

export const getPhotonDetails = z.object({
  id: z.union([z.string(), z.number()]),
  type: z.string(),
});

export const getPhotonResults = z.object({
  searchString: z.string(),
});

export const getTrailsOSM = z.object({
  lat: z.number(),
  lon: z.number(),
  radius: z.number().optional(),
});

export const postSingleGeoJSON = z.object({
  geojson: z.any(),
});
