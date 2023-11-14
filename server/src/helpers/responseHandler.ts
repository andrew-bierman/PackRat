import type express from 'express';

export function responseHandler(
  res: express.Response,
  message: string = 'Success',
) {
  const data = res.locals?.data ?? { message: 'Success' };
console.log(data)
  // Set the custom header
  res.setHeader('X-Response-Message', message);

  res.setHeader('Access-Control-Expose-Headers', 'X-Response-Message');

  console.log('message', message);

  return res.status(200).json(data);
}
