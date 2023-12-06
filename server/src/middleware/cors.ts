import { cors } from 'hono/cors';

const corsHandler = (c, next) => {
  console.log('corsHandler', c.env.CORS_ORIGIN);
  const corsOrigin = String(c.env.CORS_ORIGIN);

  const corsMiddlewareHandler = cors({
    origin: corsOrigin,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  return corsMiddlewareHandler(c, next);
};

export default corsHandler;
