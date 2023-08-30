import { z } from "zod";

type ZodParserFunction = (schema: z.ZodSchema<any>, input: any) => any;
export const zodParser: ZodParserFunction = (schema, input) => schema.parse(input);