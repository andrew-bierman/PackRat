import { Hono } from 'hono';
import { getWeatherRoute as getWeather } from '../controllers/weather/index';
import authTokenMiddleware from '../middleware/auth';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';

const router = new Hono();

router.get('/', authTokenMiddleware as any, tryCatchWrapper(getWeather));

export default router;
