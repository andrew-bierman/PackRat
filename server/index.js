import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import http from "http"
import { isCelebrateError, errors } from "celebrate";
import { ItemCategoryModel } from "./models/itemCategory.js";
import {
  MONGODB_URI,
  SERVICE_ACCOUNT_KEY,
  CORS_METHODS,
  CORS_ORIGIN,
} from "./config.js";

import routes from "./routes/index.js";

import swaggerUi from "swagger-ui-express";
import specs from "./swaggerOptions.js";
import { ItemCategory } from "./utils/itemCategory.js";
import bodyParser from "body-parser";
import { itinerary } from "./models/itineraryModel.js";

// express items
const app = express();

// Function to determine whether an origin is allowed.
const isOriginAllowed = (origin, allowedOrigin) => {
  const originDomain = new URL(origin).hostname;
  const allowedOriginDomain = new URL(allowedOrigin).hostname;
  const allowedOriginRegex = new RegExp(
    `^(packrat-pr-\\d+\.onrender\.com|${allowedOriginDomain.replace(
      /\./g,
      "\\."
    )})$`
  );

  return allowedOriginRegex.test(originDomain);
};

app.use(
  cors({
    origin: function (origin, callback) {
      // If no origin, or if origin is allowed, call back with no error and "allowed" status.
      if (!origin || isOriginAllowed(origin, CORS_ORIGIN)) {
        return callback(null, true);
      }

      // Otherwise, call back with an error.
      callback(new Error("Not allowed by CORS"));
    },
    methods: CORS_METHODS,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// const connectionString = " your connection string";
const connectionString = MONGODB_URI;

// use routes
app.use(routes);

// Serve the Swagger UI at /api-docs for api documentation, only in development
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve);
  app.get("/api-docs", swaggerUi.setup(specs));
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  app.get("/seed/category", (req, res) => {
    console.log("Seeding...");
    ItemCategory.forEach(async (category) => {
      await ItemCategoryModel.create({
        name: category,
      });
    });
    res.status(200).send("Seeding done");
  });
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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
  },
});

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  // Joining a room - Not necessary for this example, but useful for more complex scenarios
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // Handling itinerary updates from the frontend
  socket.on("update_itinerary", async (updatedItinerary) => {
    try {
      // Save the updated itinerary in MongoDB
      await itinerary.create({ days: updatedItinerary });

      // Emit the updated itinerary to all connected clients (including the sender)
      io.emit("receive_itinerary", updatedItinerary);
    } catch (error) {
      console.error("Error saving itinerary:", error.message);
    }
  });

  // Handling disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

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
server.listen(port, () =>
  // console.log("listening on ipaddress")
  console.log(`listening on port ${port}`)
);

// export default firebase;
