import express from "express";
import { getParks } from "../controllers/getParks/index.js";

const router = express.Router();

router.get("/", getParks);

export default router;
