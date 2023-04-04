import express from "express";
import { getTrails } from "../controllers/getTrailController.js";

const router = express.Router();

router.post("/", getTrails);

export default router;