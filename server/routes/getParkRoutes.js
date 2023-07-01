import express from "express";
import { getParks } from "../controllers/getParksController.js";
import {auth} from '../middleware/auth.js'
const router = express.Router();

router.get("/", auth,getParks);

export default router;
