// Assuming responseHandler is a function intended to set headers and send a response in Hono
export function responseHandler(c, message: string = 'Success') {
  const data = c.locals?.data ?? { message: 'Success' };

  // Set headers using Hono's method
  c.header('X-Response-Message', message);
  c.header('Access-Control-Expose-Headers', 'X-Response-Message');

  return c.json(data, 200);
}
