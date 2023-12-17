import { z } from 'zod';
import { Request } from 'express';

const featurePropertiesSchema = z.object({
  name: z.string(),
  'name:ar': z.string().optional(),
  'name:bn': z.string().optional(),
  'name:gu': z.string().optional(),
  'name:hi': z.string().optional(),
  'name:kn': z.string().optional(),
  'name:ml': z.string().optional(),
  'name:ne': z.string().optional(),
  'name:ru': z.string().optional(),
  'name:ta': z.string().optional(),
  'name:te': z.string().optional(),
  'name:ur': z.string().optional(),
  place: z.string(),
  population: z.string(),
  wikidata: z.string(),
  wikipedia: z.string(),
  id: z.string(),
});

const geometrySchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]),
});

const featureSchema = z.object({
  type: z.literal('Feature'),
  id: z.string(),
  properties: featurePropertiesSchema,
  geometry: geometrySchema,
});

const JoiObjectId = (message = 'valid id') =>
  z.string().regex(/^[0-9a-fA-F]{24}$/g, { message });

export const getTrips = z.object({
  owner_id: JoiObjectId().nonempty(),
});

export const getTripById = z.object({
  tripId: JoiObjectId().nonempty(),
});

export const addTrip = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  duration: z.string().nonempty(),
  weather: z.string().nonempty(),
  start_date: z.string().nonempty(),
  end_date: z.string().nonempty(),
  destination: z.string().nonempty(),
  geoJSON: z.object({
    type: z.literal('FeatureCollection'),
    features: z.array(featureSchema),
  }),
  owner_id: JoiObjectId().nonempty(),
  packs: z.string().nonempty(),
  is_public: z.boolean(),
});

export const editTrip = z.object({
  _id: JoiObjectId().nonempty(),
  name: z.string().nonempty(),
  duration: z.string().nonempty(),
  weather: z.string().nonempty(),
  start_date: z.string().nonempty(),
  end_date: z.string().nonempty(),
  destination: z.string().nonempty(),
  is_public: z.boolean(),
});

export const deleteTrip = z.object({
  tripId: JoiObjectId().nonempty(),
});
