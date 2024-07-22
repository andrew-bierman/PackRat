import { Hono } from 'hono';
import * as validator from '@packrat/validations';
import { getParks } from '../controllers/getParks/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

router.get(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.getParks, 'body'),
  tryCatchWrapper(getParks),
);

export default router;
