import { Hono } from 'hono';
import { getGeoCodeRoute as getGeoCode } from '../controllers/geoCode/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = new Hono();

router.get(
  '/',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  tryCatchWrapper(getGeoCode),
);

export default router;
