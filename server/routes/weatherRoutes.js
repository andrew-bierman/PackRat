import express from "express";
import {
  getWeatherWeek,
  getWeather,
} from "../controllers/weatherController.js";
import middlewareHandler from "../middleware/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Weather routes
 */

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get current weather
 *     tags: [Weather]
 *     responses:
 *       '200':
 *         description: Successful response with current weather
 *       '500':
 *         description: Error retrieving current weather
 */
router.get("/", [middlewareHandler.auth.verifyUserToken],getWeather);

/**
 * @swagger
 * /weather/week:
 *   get:
 *     summary: Get weekly weather forecast
 *     tags: [Weather]
 *     responses:
 *       '200':
 *         description: Successful response with weekly weather forecast
 *       '500':
 *         description: Error retrieving weekly weather forecast
 */
router.get("/week", [middlewareHandler.auth.verifyUserToken],getWeatherWeek);

export default router; 
