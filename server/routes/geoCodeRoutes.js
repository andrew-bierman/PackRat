import express from "express";
import { getGeoCode } from "../controllers/geoCodeController.js";
import { validate } from "../middleware/validation.js";
import geoCodeSchemas from "../utils/validationSchemas/geoCodeSchemas.js";

const router = express.Router();

router.get("/", validate(geoCodeSchemas.getGeoCode, "query"), getGeoCode);

export default router;
