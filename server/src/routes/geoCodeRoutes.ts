import express from "express";
import { getGeoCode } from "../controllers/geoCode/index";
import middlewareHandler from "../middleware";

const router = express.Router();

router.get("/", [middlewareHandler.auth.verifyUserToken],getGeoCode);

export default router;
