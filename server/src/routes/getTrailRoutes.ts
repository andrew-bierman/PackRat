import { Hono } from 'hono';
import * as validator from '@packrat/validations';
import { getTrailsRoute as getTrails } from '../controllers/getTrail/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

router.post(
  '/',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  ((req, res, next) => zodParser(validator.getTrails, req.body, next)) as any,
  tryCatchWrapper(getTrails),
);

export default router;
