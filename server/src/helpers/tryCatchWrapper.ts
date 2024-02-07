import { type Context, type Next } from 'hono';

export function tryCatchWrapper(fn) {
  return async (ctx: Context, next: Next) => {
    try {
      await fn(ctx, next);
    } catch (error: any) {
      next();
    }
  };
}
