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
} from '../controllers/item/index';
import * as validator from '@packrat/validations';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';
import { zodParser } from '../middleware/validators/zodParser';
import { valid } from 'joi';

const router = new Hono();

router.get(
  '/packItems/:packId',
  authTokenMiddleware as any,
  zodParser(validator.getItems, 'params'),
  tryCatchWrapper(getItems),
);

router.get(
  '/i/:id',
  authTokenMiddleware as any,
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
  authTokenMiddleware as any,
  zodParser(validator.addItem, 'body'),
  tryCatchWrapper(addItem),
);

router.put(
  '/',
  authTokenMiddleware as any,
  zodParser(validator.editItem, 'body'),
  tryCatchWrapper(editItem),
);

router.delete(
  '/',
  authTokenMiddleware as any,
  zodParser(validator.deleteItem, 'body'),
  tryCatchWrapper(deleteItem),
);

router.post(
  '/global',
  authTokenMiddleware as any,
  zodParser(validator.addItemGlobal, 'body'),
  tryCatchWrapper(addItemGlobal),
);

router.get(
  '/global',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  zodParser(validator.getItemsGlobally, 'body'),
  tryCatchWrapper(getItemsGlobally),
);

router.post(
  '/global/select/:packId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  zodParser(validator.addGlobalItemToPack, 'body'),
  tryCatchWrapper(addGlobalItemToPack),
);

router.put(
  '/global/:itemId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  zodParser(validator.editGlobalItemAsDuplicate, 'params'),
  tryCatchWrapper(editGlobalItemAsDuplicate),
);

router.delete(
  '/global/:itemId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  zodParser(validator.deleteGlobalItem, 'params'),
  tryCatchWrapper(deleteGlobalItem),
);

export default router;
