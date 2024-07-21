import { Hono } from 'hono';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import getMapPreview from '../controllers/mapPreview';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = new Hono();

router.get('/*', authTokenMiddleware, tryCatchWrapper(getMapPreview));

export default router;
