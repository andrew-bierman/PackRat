import { z } from 'zod';
import { TripActivity } from './enums';

const tripActivityValues = Object.values(TripActivity) as [string, ...string[]];

export const addTripForm = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  activity: z.enum(tripActivityValues).optional(),
  is_public: z.boolean().optional(),
});

const coordinateSchema = z.lazy(() =>
  z.union([z.number(), z.array(z.number())]),
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
  activity: z.enum(tripActivityValues).optional(),
  bounds: z.tuple([z.array(z.number()), z.array(z.number())]).optional(),
  end_date: z.string(),
  geoJSON: z.string(),
  pack_id: z.string(),
  parks: z.string().optional(),
  start_date: z.string(),
  trails: z.string().optional(),
});

export const addTrip = addTripDetails.merge(addTripForm);
export type AddTripType = z.infer<typeof addTrip>;

export const editTrip = addTrip.merge(
  z.object({
    id: z.string().min(1),
  }),
);

export type EditTripType = z.infer<typeof editTrip>;

export const setTripVisibility = z.object({
  tripId: z.string().min(1),
  is_public: z.boolean(),
});
export type SetTripVisibilityType = z.infer<typeof setTripVisibility>;

export const deleteTrip = z.object({
  tripId: z.string().min(1),
});

export const queryTrip = z.object({
  queryBy: z.string(),
  tripId: z.string(),
});
