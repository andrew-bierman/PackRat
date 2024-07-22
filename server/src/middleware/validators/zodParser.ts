import type { Context, Hono, Next } from 'hono';
import type { z, ZodSchema } from 'zod';
import { responseHandler } from '../../helpers/responseHandler';

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
      return await next();
    } catch (error) {
      c.set('error', error.message);
      return await responseHandler(c);
    }
  };
};
