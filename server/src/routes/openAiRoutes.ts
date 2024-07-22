import { Hono } from 'hono';
import * as validator from '@packrat/validations';
import {
  getAIResponse,
  getUserChats,
  getAISuggestions,
} from '../controllers/openAi/index';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

router.post(
  '/ai-response',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.getAIResponse, 'body'),
  tryCatchWrapper(getAIResponse),
);

router.get(
  '/user-chats/:userId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.getUserChats, 'body'),
  tryCatchWrapper(getUserChats),
);

router.post(
  '/ai-suggestions',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.getAISuggestions, 'body'),
  tryCatchWrapper(getAISuggestions),
);

export default router;
