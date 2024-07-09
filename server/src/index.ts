import { Hono } from 'hono';
import { fetchHandler } from 'trpc-playground/handlers/fetch';
import { appRouter } from './routes/trpcRouter';
import { honoTRPCServer } from './trpc/server';
import { cors } from 'hono/cors';
import { securityHeaders } from './middleware/securityHeaders';
import { enforceHttps } from './middleware/enforceHttps';
import { securityHeaders } from './middleware/securityHeaders';
import { enforceHttps } from './middleware/enforceHttps';
import router from './routes';
import { CORS_METHODS } from './config';
import { CORS_METHODS } from './config';

interface Bindings {
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
  } else if (serverMode === 'REST') {
    // SET UP HTTP ROUTES
    app.route(`${HTTP_ENDPOINT}`, router);
  }

  await next();
};

// Apply the Mode Selection Middleware
app.use('*', modeSelectionMiddleware);

// Common Middleware Setup
app.use('*', enforceHttps()); // HTTPS Enforcement
app.use('*', securityHeaders()); // Security Headers
app.use('*', async (c, next) => {
  // CORS Setup
  const corsMiddleware = cors({
    origin: '*', // Adjust according to your CORS policy
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: CORS_METHODS,
  });
  return corsMiddleware(c, next);
});

export default app;
