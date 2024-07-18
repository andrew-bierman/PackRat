import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { compress } from 'hono/compress';
import { fetchHandler } from 'trpc-playground/handlers/fetch';
import { CORS_METHODS } from './config';
import { enforceHttps } from './middleware/enforceHttps';
import { securityHeaders } from './middleware/securityHeaders';
import { queue } from './queue';
import router from './routes';
import { appRouter } from './routes/trpcRouter';
import { honoTRPCServer } from './trpc/server';

export interface Bindings {
  [key: string]: any;
  DB: IDBDatabase;
  JWT_VERIFICATION_KEY: string;
  APP_URL: string;
  CORS_ORIGIN: string;
  MAPBOX_ACCESS_TOKEN: string;
  readonly ETL_QUEUE: Queue<Error>;
  readonly ETL_BUCKET: R2Bucket;
}

const TRPC_API_ENDPOINT = '/api/trpc';
const TRPC_PLAYGROUND_ENDPOINT = '/trpc-playground';
const HTTP_ENDPOINT = '/api';

const app = new Hono<{ Bindings: Bindings }>();


// SETUP COMPRESSION
//  Note: On Cloudflare Workers, the response body will be compressed automatically, so there is no need to use this middleware.
//  Bun: This middleware uses CompressionStream which is not yet supported in bun.
//  ref: https://hono.dev/middleware/builtin/compress

// SETUP CORS
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

// SETUP LOGGING
app.use('*', logger());

// SETUP TRPC SERVER
app.use(`${TRPC_API_ENDPOINT}/*`, honoTRPCServer({ router: appRouter }));

// SETUP TRPC PLAYGROUND
app.use(TRPC_PLAYGROUND_ENDPOINT, async (c, next) => {
  const handler = await fetchHandler({
    router: appRouter,
    trpcApiEndpoint: TRPC_API_ENDPOINT,
    playgroundEndpoint: TRPC_PLAYGROUND_ENDPOINT,
  });
  return handler(c.req.raw);
});

// SET UP HTTP ROUTES
app.route(`${HTTP_ENDPOINT}`, router);

// SETUP CLOUDFLARE WORKER WITH EVENT HANDLERS
const worker = {
  ...app,
  fetch: app.fetch,
  queue,
};

// EXPORT WORKER
export default worker;
