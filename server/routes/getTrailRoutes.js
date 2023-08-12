import express from "express";
import { getTrails } from "../controllers/getTrail/index.js";

const router = express.Router();

router.post("/", getTrails);

export default router;
