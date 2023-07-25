import express from "express";
import { getTrails } from "../controllers/getTrailController.js";
import middlewareHandler from "../middleware/index.js";

const router = express.Router();

router.post("/", [middlewareHandler.auth.verifyUserToken],getTrails);

export default router;
