import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { fetchHandler } from 'trpc-playground/handlers/fetch';
import { appRouter } from './routes/trpcRouter';
import { honoTRPCServer } from './trpc/server';
import { securityHeaders } from './middleware/securityHeaders';
import { enforceHttps } from './middleware/enforceHttps';
import router from './routes';
import { CORS_METHODS } from './config';
import { queue } from './queue';

export interface Bindings {
  [key: string]: any;
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

// SETUP COMPRESSION
//  Note: On Cloudflare Workers, the response body will be compressed automatically, so there is no need to use this middleware.
//  Bun: This middleware uses CompressionStream which is not yet supported in bun.
//  ref: https://hono.dev/middleware/builtin/compress

// SETUP HTTPS Enforcement Middleware
app.use('*', enforceHttps()); // Apply to all routes

// SETUP SECURITY HEADERS
app.use('*', securityHeaders()); // Apply to all routes

// SETUP CORS
app.use('*', async (c, next) => {
  const CORS_ORIGIN = String(c.env.CORS_ORIGIN);
  const corsMiddleware = cors({
    // origin: CORS_ORIGIN, // uncomment this line to enable CORS
    origin: '*', // temporary
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: CORS_METHODS,
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
