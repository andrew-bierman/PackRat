import express from "express";
import { getGeoCode } from "../controllers/geoCodeController.js";
import middlewareHandler from "../middleware/index.js";

const router = express.Router();

router.get("/", [middlewareHandler.auth.verifyUserToken],getGeoCode);

export default router;
