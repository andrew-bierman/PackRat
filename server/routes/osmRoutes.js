import express from "express";
import {
  getOsm,
  getParksOSM,
  getPhotonResults,
  getTrailsOSM,
} from "../controllers/getOsmController.js";

const router = express.Router();

router.use(express.text({ limit: "50mb" })); // use text middleware to parse plain text request body

router.get("/photon/search", getPhotonResults);
router.get("/trails", getTrailsOSM);
router.get("/parks", getParksOSM);
router.post("/", getOsm);

export default router;
