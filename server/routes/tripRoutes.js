import express from "express";
import {
  getTrips,
  getTripById,
  addTrip,
  editTrip,
  deleteTrip,
} from "../controllers/tripController.js";
import * as validator from "../middleware/validators/index.js"

const router = express.Router();

router.get("/", validator.getTrips, getTrips);
router.get("/:packId", validator.getTripById, getTripById);
router.post("/", validator.addTrip, addTrip);
router.put("/", validator.editTrip, editTrip);
router.delete("/", validator.deleteTrip, deleteTrip);

export default router;
