import express from "express";
import { getOsm } from "../controllers/getOsmController.js";

const router = express.Router();

router.use(express.text({ limit: '50mb' })); // use text middleware to parse plain text request body

router.post("/", getOsm);

export default router;

