import { ZodSchema, z } from 'zod';

export type ValidationType<T extends ZodSchema> = z.infer<T>;
