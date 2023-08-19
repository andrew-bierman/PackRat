import express from "express";
import { getTrails } from "../controllers/getTrail/index";
import middlewareHandler from "../middleware";

const router = express.Router();

router.post("/",[middlewareHandler.auth.verifyUserToken], getTrails);

export default router;
