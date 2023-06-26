import express from "express";
import { getTrails } from "../controllers/getTrailController.js";
import {auth} from '../middleware/auth.js'
const router = express.Router();

router.post("/", auth,getTrails);

export default router;
