import express, { type NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { isCelebrateError, errors } from 'celebrate';
import { MONGODB_URI } from './config';
import routes from './routes/index';
import { serveSwaggerUI } from './helpers/serveSwaggerUI';
import { corsOptions } from './helpers/corsOptions';
import { errorHandler } from './helpers/errorHandler';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { limiter } from './helpers/limiter';
import * as trpcExpress from '@trpc/server/adapters/express';
import { type inferAsyncReturnType, initTRPC } from '@trpc/server';
import { appRouter } from './routes/trpcRouter';

import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { logger } from 'hono/logger';
// import { trpcServer } from '@hono/trpc-server'
import { env } from 'hono/adapter';
import { serve } from '@hono/node-server';
// import { cors } from 'hono/cors';

import type { AnyRouter } from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { MiddlewareHandler } from 'hono';
import { renderTrpcPanel } from 'trpc-panel';

// type tRPCOptions = Omit<
//   FetchHandlerRequestOptions<AnyRouter>,
//   'req' | 'endpoint'
// > &
//   Partial<Pick<FetchHandlerRequestOptions<AnyRouter>, 'endpoint'>>;

// export const trpcServer = ({
//   endpoint = '/trpc',
//   ...rest
// }: tRPCOptions): MiddlewareHandler => {
//   return async (c) => {
//     const res = fetchRequestHandler({
//       ...rest,
//       endpoint,
//       req: c.req.raw,
//     });
//     return res;
//   };
// };

// const app = new Hono();

// app.use(logger());

// console.log('Starting server...');

// // app.use('*', prettyJSON()) // With options: prettyJSON({ space: 4 })

// // app.route('*', routes)

// app.get('/', (c) => c.text('Hello Node.js!'));

// // Setup CORS for the frontend
// app.use(
//   '/api/trpc',
//   cors({
//     origin: '*',
//   }),
// );

// // export type Context = inferAsyncReturnType<typeof createContext>;

// // Setup TRPC server with context
// app.use('/api/trpc/*', async (c, next) => {
//   console.log('TRPC server middleware');
//   const middleware = trpcServer({
//     router: appRouter,
//     onError({ error }) {
//       console.error(error);
//     },
//     // createContext: (opts) =>
//     //   createContext({
//     //     ...opts,
//     //     SOME_KEY: c.env.SOME_KEY,
//     //   }),
//   });
//   return await middleware(c, next);
// });

// app.use('/panel', async (ctx, next) => {
//   return ctx.render(
//     renderTrpcPanel(appRouter, { url: 'http://localhost:3000/api/trpc' }),
//   );
// });

// app.onError((err, c) => {
//   console.error(`${err}`);
//   return c.text('Custom Error Message', 500);
// });

// // Determine the port from the environment or default to 3000 if none is provided.
// //  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
// const port = 3000;

// serve(app, (info) => {
//   console.log(`Listening on http://localhost:${info.port}`); // Listening on http://localhost:3000
// });

const app = express();

// Apply security-related HTTP headers.
// app.use(helmet({ crossOriginResourcePolicy: false }));

// Apply gzip compression to improve response times.
app.use(compression());

// Log HTTP requests.
app.use(morgan('tiny'));

// Apply rate limiting to prevent brute-force attacks.
// app.use(limiter);

// Applying CORS middleware with provided options, if any.
if (corsOptions) {
  app.use(cors(corsOptions as any));
}

// Parse incoming JSON bodies. Limit set to prevent large payloads.
app.use(express.json({ limit: '50mb' }));

// Register the main API routes.
app.use(routes);

// Serve the Swagger UI for API documentation, ideally only in development environments. Available at /api-docs.
serveSwaggerUI(app);

// Middleware to capture and log Celebrate validation errors.
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ): void => {
    if (isCelebrateError(err)) {
      console.error(err);
    }
    next(err);
  },
);
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type Context = inferAsyncReturnType<typeof createContext>;

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// Celebrate middleware to return validation errors
// Middleware provided by Celebrate to format and return validation errors to the client.
app.use(errors());

// Custom error handling middleware.
app.use(errorHandler);

// Attempting to connect to MongoDB.
const connectionString = MONGODB_URI ?? '';
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Determine the port from the environment or default to 3000 if none is provided.
const port = process.env.PORT || 3000;

// Start the Express server.
app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}.`);
});
