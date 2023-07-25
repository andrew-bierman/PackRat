import express from "express";
import { getParks } from "../controllers/getParksController.js";
import middlewareHandler from "../middleware/index.js";

const router = express.Router();

router.get("/", [middlewareHandler.auth.verifyUserToken],getParks);

export default router;
