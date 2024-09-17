import { z } from 'zod';
import { TripActivity } from './enums';

const tripActivityValues = Object.values(TripActivity) as [string, ...string[]];

export const addTripForm = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  is_public: z.union([z.literal('0'), z.literal('1')]),
});

// @ts-ignore
const coordinateSchema = z.lazy(() =>
  z.union([z.number(), z.array(coordinateSchema)]),
);

const baseGeometrySchema = z.object({
  type: z.string(),
  coordinates: coordinateSchema,
});

const geometryCollectionSchema = z.object({
  type: z.literal('GeometryCollection'),
  geometries: z.array(baseGeometrySchema),
});

const geometrySchema = z.union([baseGeometrySchema, geometryCollectionSchema]);

const featurePropertiesSchema = z.record(
  z.union([z.string(), z.number(), z.boolean()]),
);

// TODO ADD MAPS
// const featureSchema = z.object({
//   type: z.literal('Feature'),
//   id: z.string(),
//   properties: featurePropertiesSchema,
//   geometry: geometrySchema,
// });

export const getTrips = z.object({
  owner_id: z.string().optional(),
});

export const getTripById = z.object({
  tripId: z.string(),
});

export const addTripDetails = z.object({
  start_date: z.string(),
  end_date: z.string(),
  destination: z.string(),
  activity: z.enum(tripActivityValues),
  parks: z.string().optional(),
  trails: z.string().optional(),
  geoJSON: z.string(),
  owner_id: z.string(),
  pack_id: z.string(),
});

export const addTrip = addTripDetails.merge(addTripForm);

export const editTrip = z.object({
  id: z.string(),
  name: z.string().optional(),
  duration: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  destination: z.string().optional(),
  is_public: z.boolean().optional(),
});

export const deleteTrip = z.object({
  tripId: z.string().nonempty(),
});

export const queryTrip = z.object({
  queryBy: z.string(),
  tripId: z.string(),
});
