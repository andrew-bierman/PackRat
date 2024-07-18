// Assuming responseHandler is a function intended to set headers and send a response in Hono
import { type Context } from 'hono';

export async function responseHandler(
  ctx: Context,
  message: string = 'Success',
) {
  const data = ctx.get('data');
  const error = ctx.get('error');

  ctx.header('X-Response-Message', message);
  ctx.header('Access-Control-Expose-Headers', 'X-Response-Message');

  console.log('message', message, data, error);

  if (error) {
    return await ctx.json({ error }, 400);
  } else {
    return await ctx.json(data ?? { message: 'Success' }, 200);
  }
}
