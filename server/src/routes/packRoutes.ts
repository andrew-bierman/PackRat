import { Hono } from 'hono';
import {
  getPacks,
  getPackById,
  addPack,
  editPack,
  deletePack,
  getPublicPacks,
  scorePack,
  duplicatePublicPack,
  getSimilarPacks,
} from '../controllers/pack/index';
import * as validator from '@packrat/validations';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

router.get(
  '/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(getPublicPacks),
);

router.get(
  '/similarPacks',
  authTokenMiddleware,
  zodParser(validator.getSimilarPacks, 'body'),
  tryCatchWrapper(getSimilarPacks),
);

router.get(
  '/:ownerId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.getPacks, 'params'),
  tryCatchWrapper(getPacks),
);

router.get(
  '/p/:packId',
  authTokenMiddleware,
  zodParser(validator.getPackById, 'params'),
  tryCatchWrapper(getPackById),
);

router.put(
  '/score/:packId',
  authTokenMiddleware,
  zodParser(validator.getPackById, 'params'),
  tryCatchWrapper(scorePack),
);

router.post(
  '/',
  authTokenMiddleware,
  zodParser(validator.addPack, 'body'),
  tryCatchWrapper(addPack),
);

router.put(
  '/',
  authTokenMiddleware,
  zodParser(validator.editPack, 'body'),
  tryCatchWrapper(editPack),
);

router.delete(
  '/',
  authTokenMiddleware,
  zodParser(validator.deletePack, 'body'),
  tryCatchWrapper(deletePack),
);

router.post(
  '/duplicate',
  authTokenMiddleware,
  zodParser(validator.duplicatePublicPack, 'body'),
  tryCatchWrapper(duplicatePublicPack),
);

export default router;
