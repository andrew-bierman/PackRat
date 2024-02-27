import { Hono } from 'hono';
import { getTrails } from '../controllers/getTrail/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = new Hono();

router.post(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getTrails),
);

export default router;
