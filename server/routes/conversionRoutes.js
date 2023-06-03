import express from "express";
import { convertWeight } from "../controllers/conversionController.js";

const router = express.Router();

// Endpoint for weight conversion
router.post("/", convertWeight);

export default router;
