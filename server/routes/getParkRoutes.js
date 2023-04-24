import express from "express";
import { getParks } from "../controllers/getParksController.js";

const router = express.Router();

router.get("/", getParks);

export default router;
