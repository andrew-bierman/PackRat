import { Hono } from 'hono';
import {
  getTemplates,
  getTemplateById,
  addTemplate,
  editTemplate,
  deleteTemplate,
} from '../controllers/template/index';
import { isAdmin } from '../middleware/isAdmin';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = new Hono();

router.get(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getTemplates),
);

router.get(
  '/:templateId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getTemplateById),
);

router.post(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  isAdmin,
  tryCatchWrapper(addTemplate),
);

router.put(
  '/:templateId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  isAdmin,
  tryCatchWrapper(editTemplate),
);

router.delete(
  '/:templateId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  isAdmin,
  tryCatchWrapper(deleteTemplate),
);

export default router;
