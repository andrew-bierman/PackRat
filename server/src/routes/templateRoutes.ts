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
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  tryCatchWrapper(getTemplates),
);

router.get(
  '/:templateId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  tryCatchWrapper(getTemplateById),
);

router.post(
  '/',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  isAdmin as any,
  tryCatchWrapper(addTemplate),
);

router.put(
  '/:templateId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  isAdmin as any,
  tryCatchWrapper(editTemplate),
);

router.delete(
  '/:templateId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  isAdmin as any,
  tryCatchWrapper(deleteTemplate),
);

export default router;
