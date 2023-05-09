import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGODB_URI, SERVICE_ACCOUNT_KEY } from "./config.js";

import firebase from "firebase-admin";

// import serviceAccountKey from "./serviceAccountKey.json" assert { type: "json" };
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const serviceAccountKey = require("./serviceAccountKey.json");

// // Initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(SERVICE_ACCOUNT_KEY)
});

// express items
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// const connectionString = " your connection string";
const connectionString = MONGODB_URI;

// import routes
import userRoutes from "./routes/userRoutes.js";
import packRoutes from "./routes/packRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import geoCodeRoutes from "./routes/geoCodeRoutes.js";
import getParkRoutes from "./routes/getParkRoutes.js";
import getTrailRoutes from "./routes/getTrailRoutes.js";
import osmRoutes from "./routes/osmRoutes.js";
import passwordResetRoutes from "./routes/passwordResetRoutes.js";

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  res.on("finish", () => {
    console.log(`${req.method} ${req.path} ${res.statusCode}`);
    console.log(res.body);
  });
  next();
};

app.use(logger);

// use routes
app.use("/user", userRoutes);
app.use("/pack", packRoutes);
app.use("/item", itemRoutes);
app.use("/trip", tripRoutes);
app.use("/weather", weatherRoutes);
app.use("/geocode", geoCodeRoutes);
app.use("/getparks", getParkRoutes);
app.use("/gettrails", getTrailRoutes);
app.use("/osm", osmRoutes);
app.use("/password-reset", passwordResetRoutes);

// Also listen to /api for backwards compatibility
app.use("/api/user", userRoutes);
app.use("/api/pack", packRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/geocode", geoCodeRoutes);
app.use("/api/getparks", getParkRoutes);
app.use("/api/gettrails", getTrailRoutes);
app.use("/api/osm", osmRoutes);
app.use("/api/password-reset", passwordResetRoutes);

mongoose.connect(connectionString).then(() => console.log("connected"));

// app.listen(3000, () => console.log("listening on port 3000"));

const port = process.env.PORT || 3000;

// enter your ipaddress for the second param
app.listen(port, () =>
  // console.log("listening on ipaddress")
  console.log(`listening on port ${port}`)
);

export default firebase