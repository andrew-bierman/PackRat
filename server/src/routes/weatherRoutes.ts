import { Hono } from 'hono';
import { getWeather } from '../controllers/weather/index';
import authTokenMiddleware from '../middleware/auth';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';

const router = new Hono();

router.get('/', authTokenMiddleware, tryCatchWrapper(getWeather));

export default router;
