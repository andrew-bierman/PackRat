// import type express from 'express';

// export function responseHandler(
//   res: express.Response,
//   message: string = 'Success',
// ) {
//   const data = res.locals?.data ?? { message: 'Success' };

//   // Set the custom header
//   res.setHeader('X-Response-Message', message);

//   res.setHeader('Access-Control-Expose-Headers', 'X-Response-Message');

//   console.log('message', message);

//   return res.status(200).json(data);
// }

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
    return await ctx.json(data ?? { message: 'Success' });
  }
}
