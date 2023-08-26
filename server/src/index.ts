import express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { isCelebrateError, errors } from 'celebrate';
import { MONGODB_URI } from './config';
import routes from './routes/index';
import bodyParser from 'body-parser';
import { serveSwaggerUI } from './helpers/serveSwaggerUI';
import { corsOptions } from './helpers/corsOptions';
import { errorHandler } from './helpers/errorHandler';

// express items
const app = express();

if (corsOptions) {
  app.use(cors(corsOptions as any));
}
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// const connectionString = " your connection string";
const connectionString = MONGODB_URI ?? '';

// use routes
app.use(routes);
// Serve the Swagger UI at /api-docs for api documentation, only in development
serveSwaggerUI(app);

// middleware to log Celebrate validation errors
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

// Celebrate middleware to return validation errors
app.use(errors());

// custom error handler function
app.use(errorHandler);

// connect to mongodb
mongoose.connect(connectionString).then(() => {
  console.log('connected');
});

const port = process.env.PORT || 3000;

// enter your ipaddress for the second param
app.listen(port, () =>
  // console.log("listening on ipaddress")
  {
    console.log(`listening on port ${port}`);
  },
);
