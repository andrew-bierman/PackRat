import { type Ai } from '@cloudflare/ai';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { fetchHandler } from 'trpc-playground/handlers/fetch';
import { CORS_METHODS } from './config';
import { enforceHttps } from './middleware/enforceHttps';
import { securityHeaders } from './middleware/securityHeaders';
import { queue } from './queue';
import router from './routes';
import { appRouter } from './routes/trpcRouter';
import { httpDBContext } from './trpc/httpDBContext';
import { honoTRPCServer } from './trpc/server';

export interface Bindings {
  [key: string]: any;
  DB: IDBDatabase;
  VECTOR_INDEX: VectorizeIndex;
  AI: Ai;
  JWT_VERIFICATION_KEY: string;
  APP_URL: string;
  CORS_ORIGIN: string;
  MAPBOX_ACCESS_TOKEN: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  VECTORIZE_API_KEY: string;
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

// SETUP HTTPS Enforcement Middleware "This is for HTTP and has no relation to the tRPC server". and there are routes that are only available over HTTPS
app.use('*', enforceHttps()); // Apply to all routes so avoid commenting this unless you are on local

// SETUP Security Headers Middleware "This is for HTTP and has no relation to the tRPC server". and there are routes that are only available over HTTPS
app.use('*', securityHeaders()); // Apply to all routes so avoid commenting this unless you are on local

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
  // change for testing the workflow
  return corsMiddleware(c, next);
});

// SETUP LOGGING
//  tRPC is already logging requests, but you can add your own middleware
//  app.use('*', logger());

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

// A middleware to initiate db connection and add it to the context
app.use(`${HTTP_ENDPOINT}/*`, httpDBContext);
app.route(`${HTTP_ENDPOINT}/`, router);

// SETUP CLOUDFLARE WORKER WITH EVENT HANDLERS
const worker = {
  ...app,
  fetch: app.fetch,
  queue,
};

export default worker;
