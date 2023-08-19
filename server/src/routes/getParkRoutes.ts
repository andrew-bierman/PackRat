import express from "express";
import { getParks } from "../controllers/getParks/index";
import middlewareHandler from "../middleware";

const router = express.Router();

router.get("/", [middlewareHandler.auth.verifyUserToken],getParks);

export default router;
