import express from "express";
import { getGeoCode } from "../controllers/geoCodeController.js";

const router = express.Router();

router.get("/", getGeoCode);

export default router;
