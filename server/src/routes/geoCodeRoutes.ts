import express from "express";
import { getGeoCode } from "../controllers/geoCode/index";
import { tryCatchWrapper } from "../helpers/tryCatchWrapper";

const router = express.Router();

router.get("/", tryCatchWrapper(getGeoCode));

export default router;
