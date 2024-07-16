import { type NextFunction } from 'express';
import { type z } from 'zod';

type ZodParserFunction = (
  schema: z.ZodSchema<any>,
  input: any,
  next: NextFunction,
) => any;
export const zodParser: ZodParserFunction = async (schema, input, next) => {
  schema.parse(input);
  return await next();
};
