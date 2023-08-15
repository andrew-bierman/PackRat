import express from "express";
import { getParks } from "../controllers/getParks/index.ts";

const router = express.Router();

router.get("/", getParks);

export default router;
