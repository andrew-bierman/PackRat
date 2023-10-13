import express from 'express';
import { getParks } from '../controllers/getParks/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

import { Hono } from 'hono';

const router = new Hono();

router.get(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getParks),
);

export default router;
