import { Application, Request, Response } from 'express';
import Base from '../Base';
import { getWeatherWeek } from './getWeatherWeek';
import { getWeather } from './getWeather';

export default class WeatherController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/weather', this.router);
        express.use("/api/weather", this.router);
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
        this.router.get("/", getWeather);

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
        this.router.get("/week", getWeatherWeek);
    }
}