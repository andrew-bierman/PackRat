import { z, ZodSchema } from "zod";
import { Request } from "express";

function zodParser(schema: ZodSchema, input: any) {
  return schema.parse(input);
}

export const JoiObjectId = (message = "valid id") =>
  z.string().regex(/^[0-9a-fA-F]{24}$/g, { message });

export const getTrips = (req: Request) => {
  zodParser(
    z.object({
      owner_id: JoiObjectId(),
    }),
    req.body
  );
};

export const getTripById = (req: Request) => {
  zodParser(
    z.object({
      tripId: JoiObjectId(),
    }),
    req.params
  );
};

export const addTrip = (req: Request) => {
  zodParser(
    z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      duration: z.string().nonempty(),
      weather: z.string().nonempty(),
      start_date: z.string().nonempty(),
      end_date: z.string().nonempty(),
      destination: z.string().nonempty(),
      geoJSON: z.object({}),
      owner_id: JoiObjectId(),
      packs: z.string().nonempty(),
      is_public: z.boolean(),
    }),
    req.body
  );
};

export const editTrip = (req: Request) => {
  zodParser(
    z.object({
      _id: JoiObjectId(),
      name: z.string().nonempty(),
      duration: z.string().nonempty(),
      weather: z.string().nonempty(),
      start_date: z.string().nonempty(),
      end_date: z.string().nonempty(),
      destination: z.string().nonempty(),
      is_public: z.boolean(),
    }),
    req.body
  );
};

export const deleteTrip = (req: Request) => {
  zodParser(
    z.object({
      tripId: JoiObjectId(),
    }),
    req.body
  );
};
