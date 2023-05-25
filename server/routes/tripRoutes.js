import express from "express";
import {
  getPublicTrips,
  getTrips,
  getTripById,
  addTrip,
  editTrip,
  deleteTrip,
} from "../controllers/tripController.js";
import * as validator from "../middleware/validators/index.js"

const router = express.Router();

router.get("/", getPublicTrips);
router.get("/:ownerId", validator.getTrips, getTrips);
router.get("/t/:tripId", validator.getTripById, getTripById);
router.post("/", validator.addTrip, addTrip);
router.put("/", validator.editTrip, editTrip);
router.delete("/", validator.deleteTrip, deleteTrip);

export default router;
