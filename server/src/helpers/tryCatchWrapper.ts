import { type Context, type Next } from 'hono';

export function tryCatchWrapper(fn) {
  return async (ctx: Context, next: Next) => {
    try {
      return await fn(ctx, next);
    } catch (error: any) {
      return ctx.json({ error: 'Internal Server Error' }, 500);
    }
  };
}
