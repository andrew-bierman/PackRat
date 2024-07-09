import { Hono } from 'hono';
import {
  getWeatherWeekRoute as getWeatherWeek,
  getWeatherRoute as getWeather,
} from '../controllers/weather/index';
import authTokenMiddleware from '../middleware/auth';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';

const router = new Hono();

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
router.get('/', authTokenMiddleware as any, tryCatchWrapper(getWeather));

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
router.get(
  '/week',
  authTokenMiddleware as any,
  tryCatchWrapper(getWeatherWeek),
);

export default router;
