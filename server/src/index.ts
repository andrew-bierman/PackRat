import { Hono } from 'hono';
import { fetchHandler } from 'trpc-playground/handlers/fetch';
import { appRouter } from './routes/trpcRouter';
import { honoTRPCServer } from './trpc/server';
import { cors } from 'hono/cors';
// import { logger } from 'hono/logger';
import { compress } from 'hono/compress';
import router from './routes';

interface Bindings {
  DB: IDBDatabase;
  JWT_VERIFICATION_KEY: string;
  APP_URL: string;
  CORS_ORIGIN: string;
  MAPBOX_ACCESS_TOKEN: string;
}

const TRPC_API_ENDPOINT = '/api/trpc';
const TRPC_PLAYGROUND_ENDPOINT = '/trpc-playground';
const HTTP_ENDPOINT = '/api';

const app = new Hono<{ Bindings: Bindings }>();

//  Setup compression
app.use(
  '*',
  compress({
    encoding: 'deflate',
  }),
);

//  Setup CORS
app.use('*', async (c, next) => {
  const CORS_ORIGIN = String(c.env.CORS_ORIGIN);
  const corsMiddleware = cors({
    // origin: CORS_ORIGIN,
    origin: '*', // temporary
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  return corsMiddleware(c, next);
});

// Setup logging
// tRPC is already logging requests, but you can add your own middleware
// app.use('*', logger());

//  Setup tRPC server
app.use(`${TRPC_API_ENDPOINT}/*`, honoTRPCServer({ router: appRouter }));

//  Setup tRPC Playground
app.use(TRPC_PLAYGROUND_ENDPOINT, async (c, next) => {
  const handler = await fetchHandler({
    router: appRouter,
    trpcApiEndpoint: TRPC_API_ENDPOINT,
    playgroundEndpoint: TRPC_PLAYGROUND_ENDPOINT,
  });
  return handler(c.req.raw);
});

// Set up HTTP routes
app.route(`${HTTP_ENDPOINT}`, router);

export default app;
