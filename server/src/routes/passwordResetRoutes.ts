import { Hono } from 'hono';
import {
  requestPasswordResetEmailAndTokenRoute as requestPasswordResetEmailAndToken,
  handlePasswordResetRoute as handlePasswordReset,
} from '../controllers/passwordReset/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';

const router = new Hono();

router.post('/', tryCatchWrapper(requestPasswordResetEmailAndToken));
router.post('/:token', tryCatchWrapper(handlePasswordReset));

export default router;
