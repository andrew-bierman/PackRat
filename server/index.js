import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { isCelebrateError, errors } from "celebrate";
import {ItemCategoryModel} from './models/itemCategory.js'
import { MONGODB_URI, SERVICE_ACCOUNT_KEY,CORS_METHODS,CORS_ORIGIN } from "./config.js";

import routes from "./routes/index.js";

import swaggerUi from "swagger-ui-express";
import specs from "./swaggerOptions.js";
import {ItemCategory} from './utils/itemCategory.js'
import bodyParser from "body-parser";

// express items
const app = express();
app.use(cors({
  origin:CORS_ORIGIN,
  methods:CORS_METHODS
}));
app.use(bodyParser.json({limit:"50mb"}));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// const connectionString = " your connection string";
const connectionString = MONGODB_URI;

// use routes
app.use(routes);

// Serve the Swagger UI at /api-docs for api documentation, only in development
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve);
  app.get("/api-docs", swaggerUi.setup(specs));
  app.get('/seed/category',(req,res)=>{
    console.log('Seeding...')
    ItemCategory.forEach(async(category)=>{
      await ItemCategoryModel.create({
        name:category
      });
    })
    res.status(200).send('Seeding done')
  })
}

// middleware to log Celebrate validation errors
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    console.error(err);
  }
  next(err);
});

// Celebrate middleware to return validation errors
app.use(errors());

// connect to mongodb
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"));

// app.listen(3000, () => console.log("listening on port 3000"));

const port = process.env.PORT || 3000;

// enter your ipaddress for the second param
app.listen(port, () =>
  // console.log("listening on ipaddress")
  console.log(`listening on port ${port}`)
);

// export default firebase;
