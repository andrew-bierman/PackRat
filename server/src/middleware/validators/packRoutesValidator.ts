import { z } from "zod";
import { Request } from "express";

type ZodParserFunction = (schema: z.ZodSchema<any>, input: any) => any;

/**
 * Creates a Zod validation rule for ObjectId strings.
 *
 * @param {string} [message="valid id"] - The validation error message.
 * @return {z.ZodString} A Zod validation rule for ObjectId strings.
 */
export const JoiObjectId = (message: any = "valid id"): z.ZodString =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, { message });

const zodParser: ZodParserFunction = (schema, input) => schema.parse(input);

export const getPacks = (req: Request) => {
  zodParser(
    z.object({
      ownerId: JoiObjectId(),
    }),
    req.params
  );
};

export const getPackById = (req: Request) => {
  zodParser(
    z.object({
      packId: JoiObjectId(),
    }),
    req.params
  );
};

export const addPack = (req: Request) => {
  zodParser(
    z.object({
      name: z.string().nonempty(),
      owner_id: JoiObjectId(),
      is_public: z.boolean(),
    }),
    req.body
  );
};

export const editPack = (req: Request) => {
  zodParser(
    z.object({
      _id: JoiObjectId(),
      name: z.string().nonempty(),
      is_public: z.boolean(),
    }),
    req.body
  );
};

export const deletePack = (req: Request) => {
  zodParser(
    z.object({
      packId: JoiObjectId(),
    }),
    req.body
  );
};

export const duplicatePublicPack = (req: Request) => {
  zodParser(
    z.object({
      packId: JoiObjectId(),
      ownerId: JoiObjectId(),
      items: z.array(z.object({})),
    }),
    req.body
  );
};
