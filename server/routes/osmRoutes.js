import express from "express";
import { getOsm } from "../controllers/getOsmController.js";

const router = express.Router();
router.post("/", getOsm);

export default router;