import type { Context, Hono, Next } from 'hono';
import type { z, ZodSchema } from 'zod';

// Define the Zod parser function as middleware
export const zodParser = (
  schema: ZodSchema<any>,
  location: 'body' | 'query' | 'params',
) => {
  return async (c: Context, next: Next) => {
    try {
      let input: any;
      if (location === 'body') {
        input = await c.req.json();
      } else if (location === 'query') {
        input = c.req.query();
      } else if (location === 'params') {
        input = c.req.param();
      }

      schema.parse(input);
      await next();
    } catch (error) {
      c.status(400);
      c.json({ error: error.errors });
    }
  };
};
