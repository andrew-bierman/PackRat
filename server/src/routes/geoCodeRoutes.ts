import express from "express";
import { getGeoCode } from "../controllers/geoCode/index.ts";

const router = express.Router();

router.get("/", getGeoCode);

export default router;
