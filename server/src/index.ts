import { Hono } from 'hono';
import { fetchHandler } from 'trpc-playground/handlers/fetch';
import { appRouter } from './routes/trpcRouter';
import { honoTRPCServer } from './trpc/server';
import { cors } from 'hono/cors';
import { securityHeaders } from './middleware/securityHeaders';
import { enforceHttps } from './middleware/enforceHttps';
import router from './routes';
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

// Custom Middleware for Mode Selection
const modeSelectionMiddleware = async (c: any, next: any) => {
  const serverMode = c.env.SERVER_MODE || 'tRPC'; // Default to 'tRPC' if not set

  if (serverMode === 'tRPC') {
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
