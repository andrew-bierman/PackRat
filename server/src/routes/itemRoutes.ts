import { Hono } from 'hono';
import {
  getItems,
  getItemById,
  addItem,
  addItemGlobal,
  editItem,
  deleteItem,
  searchItemsByName,
  getItemsGlobally,
  addGlobalItemToPack,
  editGlobalItemAsDuplicate,
  deleteGlobalItem,
  importItems,
  importItemsGlobal,
  getSimilarItems,
  importFromBucket,
  importNotifiedETL,
} from '../controllers/item/index';
import * as validator from '@packrat/validations';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';

const router = new Hono();

router.get(
  '/packItems/:packId?',
  authTokenMiddleware,
  zodParser(validator.getItems, 'params'),
  tryCatchWrapper(getItems),
);

router.get(
  '/similarItems',
  authTokenMiddleware,
  zodParser(validator.getSimilarItems, 'body'),
  tryCatchWrapper(getSimilarItems),
);

router.get(
  '/importFromBucket',
  authTokenMiddleware,
  // zodParser(validator.importFromBucket, 'query'),
  tryCatchWrapper(importFromBucket),
);

router.post(
  '/importNotifiedETL',
  zodParser(validator.importNotifiedETL, 'body'),
  tryCatchWrapper(importNotifiedETL),
);

router.get(
  '/i/:id',
  authTokenMiddleware,
  zodParser(validator.getItemById, 'params'),
  tryCatchWrapper(getItemById),
);

router.get(
  '/search',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(searchItemsByName),
);

router.post(
  '/',
  authTokenMiddleware,
  zodParser(validator.addItem, 'body'),
  tryCatchWrapper(addItem),
);

router.post(
  '/import',
  authTokenMiddleware,
  zodParser(validator.importItem, 'body'),
  tryCatchWrapper(importItems),
);

router.post(
  '/importGlobal',
  authTokenMiddleware,
  zodParser(validator.importItemsGlobal, 'body'),
  tryCatchWrapper(importItemsGlobal),
);

router.put(
  '/',
  authTokenMiddleware,
  zodParser(validator.editItem, 'body'),
  tryCatchWrapper(editItem),
);

router.delete(
  '/',
  authTokenMiddleware,
  zodParser(validator.deleteItem, 'body'),
  tryCatchWrapper(deleteItem),
);

router.post(
  '/global',
  authTokenMiddleware,
  zodParser(validator.addItemGlobal, 'body'),
  tryCatchWrapper(addItemGlobal),
);

router.get(
  '/global',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.getItemsGlobally, 'body'),
  tryCatchWrapper(getItemsGlobally),
);

router.post(
  '/global/select/',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.addGlobalItemToPack, 'body'),
  tryCatchWrapper(addGlobalItemToPack),
);

router.put(
  '/global/:itemId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.editGlobalItemAsDuplicate, 'params'),
  tryCatchWrapper(editGlobalItemAsDuplicate),
);

router.delete(
  '/global/:itemId',
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  zodParser(validator.deleteGlobalItem, 'params'),
  tryCatchWrapper(deleteGlobalItem),
);

export default router;
