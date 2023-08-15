import express from "express";
import { getGeoCode } from "../controllers/geoCode/index.js";

const router = express.Router();

router.get("/", getGeoCode);

export default router;
