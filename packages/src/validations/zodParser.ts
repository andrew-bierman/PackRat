import express from "express"
import { z } from "zod";

type ZodParserFunction = (schema: z.ZodSchema<any>, input: any, next: express.NextFunction) => any;
export const zodParser: ZodParserFunction = (schema, input, next) => {
    schema.parse(input)
    next();
};

