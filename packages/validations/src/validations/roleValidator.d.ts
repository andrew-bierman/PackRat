import { z } from 'zod';
export declare const RoleSchema: z.ZodUnion<[z.ZodLiteral<"user">, z.ZodLiteral<"admin">]>;
