import express from "express";
import {
  getTrips,
  getTripById,
  addTrip,
  editTrip,
  deleteTrip,
} from "../controllers/tripController.js";
const router = express.Router();

// router.get("/", getPublicTrips); // getPublicTrips is not defined yet
router.get("/:ownerId", getTrips);
router.get("/t/:tripId", getTripById);
router.post("/", addTrip);
router.put("/", editTrip);
router.delete("/", deleteTrip);

export default router;
