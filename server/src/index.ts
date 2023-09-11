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
import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { appRouter } from './routes/trpcRouter';

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
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
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
