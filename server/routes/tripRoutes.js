import express from "express";
import {
  getTrips,
  getTripById,
  addTrip,
  editTrip,
  deleteTrip,
} from "../controllers/tripController.js";
const router = express.Router();

router.get("/", getTrips);
router.get("/:packId", getTripById);
router.post("/", addTrip);
router.put("/", editTrip);
router.delete("/", deleteTrip);

export default router;
