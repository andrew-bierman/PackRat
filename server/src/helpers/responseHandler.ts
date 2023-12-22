import type express from 'express';

export function responseHandler(
  res: express.Response,
  message: string = 'Success',
) {
  const data = res.locals?.data ?? { message: 'Success' };

  // Set the custom header
  res.setHeader('X-Response-Message', message);

  res.setHeader('Access-Control-Expose-Headers', 'X-Response-Message');

  return res.status(200).json(data);
}
