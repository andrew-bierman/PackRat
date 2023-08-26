import express from "express";
import { getParks } from "../controllers/getParks/index";
import { tryCatchWrapper } from "../helpers/tryCatchWrapper";

const router = express.Router();

router.get("/", tryCatchWrapper(getParks));

export default router;
