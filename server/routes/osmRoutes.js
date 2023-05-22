import express from "express";
import { getOsm, getPhotonResults } from "../controllers/getOsmController.js";

const router = express.Router();

router.use(express.text({ limit: "50mb" })); // use text middleware to parse plain text request body

router.get("/photon/search", getPhotonResults);
router.post("/", getOsm);

export default router;
