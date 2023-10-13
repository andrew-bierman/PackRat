import express from 'express';
import {
  requestPasswordResetEmailAndToken,
  handlePasswordReset,
} from '../controllers/passwordReset/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';

import { Hono } from 'hono';

const router = new Hono();

router.post('/', tryCatchWrapper(requestPasswordResetEmailAndToken));
router.post('/:token', tryCatchWrapper(handlePasswordReset));

export default router;
