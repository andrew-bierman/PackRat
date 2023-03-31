import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGODB_URI } from "./config.js";

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

// use routes
app.use("/user", userRoutes);
app.use("/pack", packRoutes);
app.use("/item", itemRoutes);
app.use("/trip", tripRoutes);
app.use("/weather", weatherRoutes);

mongoose.connect(connectionString).then(() => console.log("connected"));

// app.listen(3000, () => console.log("listening on port 3000"));

const port = process.env.PORT || 3000;

// enter your ipaddress for the second param
app.listen(port, () =>
  // console.log("listening on ipaddress")
  console.log(`listening on port ${port}`)
);
