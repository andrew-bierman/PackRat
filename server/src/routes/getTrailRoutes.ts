import express from "express";
import { getTrails } from "../controllers/getTrail/index.ts";

const router = express.Router();

router.post("/", getTrails);

export default router;
