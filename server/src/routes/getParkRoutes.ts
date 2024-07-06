import { Hono } from 'hono';
import * as validator from '@packrat/validations';
import { getParksRoute as getParks } from '../controllers/getParks/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

router.get(
  '/',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  ((req, res, next) => zodParser(validator.getParks, req.body, next)) as any,
  tryCatchWrapper(getParks),
);

export default router;
