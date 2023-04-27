import express from "express";
import { getWeatherWeek, getWeather } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/", getWeather);
router.get("/week", getWeatherWeek);

export default router;
