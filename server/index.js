import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGODB_URI, SERVICE_ACCOUNT_KEY } from "./config.js";
import routes from "./routes/index.js";

// import firebase from "firebase-admin";

// import serviceAccountKey from "./serviceAccountKey.json" assert { type: "json" };
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const serviceAccountKey = require("./serviceAccountKey.json");

// // Initialize Firebase
// firebase.initializeApp({
//   credential: firebase.credential.cert(SERVICE_ACCOUNT_KEY),
// });

// express items
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// const connectionString = " your connection string";
const connectionString = MONGODB_URI;

// use routes
app.use(routes);

// connect to mongoDB
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
