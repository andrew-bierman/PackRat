import express from 'express';
import { getParks } from '../controllers/getParks/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = express.Router();

router.get(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getParks),
);

export default router;
