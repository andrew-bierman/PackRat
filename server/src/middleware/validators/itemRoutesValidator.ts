import { z } from "zod";
import { Request } from "express";

type ZodParserFunction = (schema: z.ZodSchema<any>, input: any) => any;

/**
 * Creates a Zod validation rule for MongoDB ObjectIds.
 *
 * @param {string} [message="valid id"] - The error message to display if the validation fails.
 * @return {z.ZodString} - The Zod validation rule for MongoDB ObjectIds.
 */
export const JoiObjectId = (message = "valid id") =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, { message });

const zodParser: ZodParserFunction = (schema, input) => schema.parse(input);

export const getItems = (req: Request) => {
  zodParser(
    z.object({
      packId: JoiObjectId(),
    }),
    req.params
  );
};

export const getItemById = (req: Request) => {
  zodParser(
    z.object({
      _id: JoiObjectId(),
    }),
    req.body
  );
};

export const addItem = (req: Request) => {
  zodParser(
    z.object({
      name: z.string().nonempty(),
      weight: z.string().nonempty(),
      quantity: z.string().nonempty(),
      unit: z.string().nonempty(),
      packId: JoiObjectId(),
      type: z.string().optional(),
    }),
    req.body
  );
};

export const editItem = (req: Request) => {
  zodParser(
    z.object({
      _id: JoiObjectId(),
      name: z.string().nonempty(),
      weight: z.string().nonempty(),
      quantity: z.string().nonempty(),
      unit: z.string().nonempty(),
      type: z.string(),
    }),
    req.body
  );
};

export const deleteItem = (req: Request) => {
  zodParser(
    z.object({
      itemId: JoiObjectId().nonempty(),
      packId: JoiObjectId().nonempty(),
    }),
    req.body
  );
};

export const addItemGlobal = (req: Request) => {
  zodParser(
    z.object({
      name: z.string().nonempty(),
      weight: z.string().nonempty(),
      quantity: z.string().nonempty(),
      unit: z.string().nonempty(),
      type: z.string().optional(),
    }),
    req.body
  );
};
