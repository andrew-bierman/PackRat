import { z } from 'zod';
import { Request } from 'express';

export const JoiObjectId = (message = 'valid id') =>
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
  geoJSON: z.object({}),
  owner_id: JoiObjectId().nonempty(),
  packs: z.string().nonempty(),
  is_public: z.boolean(),
});

export const addTripForm = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  isPublic: z.union([z.literal('0'), z.literal('1')]),
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

export const queryTrip = z.object({
  queryBy: z.string(),
});
