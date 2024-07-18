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

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: item routes
 */

/**
 * @swagger
 * /item/packItems/{packId}:
 *  get:
 *    tags:
 *      - Items
 *    summary: Get items by pack ID
 *    parameters:
 *      - in: path
 *        name: packId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.get(
  '/packItems/:packId',
  authTokenMiddleware as any,
  zodParser(validator.getItems, 'params'),
  tryCatchWrapper(getItems),
);

/**
 * @swagger
 * /item/i/{packId}:
 *  get:
 *    tags:
 *      - Items
 *    summary: Get item by item ID
 *    parameters:
 *      - in: path
 *        name: packId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.get(
  '/i/:id',
  authTokenMiddleware as any,
  zodParser(validator.getItemById, 'params'),
  tryCatchWrapper(getItemById),
);

/**
 * @swagger
 * /item/search:
 *   get:
 *     tags:
 *       - Items
 *     summary: Search items by name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Text to search for items by name
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
  '/search',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  tryCatchWrapper(searchItemsByName),
);

/**
 * @swagger
 * /item/:
 *  post:
 *    tags:
 *      - Items
 *    summary: Add a new item
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              weight:
 *                type: number
 *              quantity:
 *                type: number
 *              unit:
 *                type: string
 *              packId:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.post(
  '/',
  authTokenMiddleware as any,
  zodParser(validator.addItem, 'body'),
  tryCatchWrapper(addItem),
);

/**
 * @swagger
 * /item/:
 *  put:
 *    tags:
 *      - Items
 *    summary: Edit an existing item
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              weight:
 *                type: number
 *              quantity:
 *                type: number
 *              unit:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.put(
  '/',
  authTokenMiddleware as any,
  zodParser(validator.editItem, 'body'),
  tryCatchWrapper(editItem),
);

/**
 * @swagger
 * /item/:
 *  delete:
 *    tags:
 *      - Items
 *    summary: Delete an item by ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.delete(
  '/',
  authTokenMiddleware as any,
  zodParser(validator.deleteItem, 'body'),
  tryCatchWrapper(deleteItem),
);

/**
 * @swagger
 * /item/:
 *  post:
 *    tags:
 *      - Items
 *    summary: Add a item to Global items list
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              weight:
 *                type: number
 *              quantity:
 *                type: number
 *              unit:
 *                type: string
 *              type:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.post(
  '/global',
  authTokenMiddleware as any,
  zodParser(validator.addItemGlobal, 'body'),
  tryCatchWrapper(addItemGlobal),
);

/**
 * @swagger
 * /item/:
 *  get:
 *    tags:
 *      - Items
 *    summary: get a item to Global items list
 *    requestBody:
 *      required: false
 *    responses:
 *      200:
 *        description: Successful response
 */
router.get(
  '/global',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  zodParser(validator.getItemsGlobally, 'body'),
  tryCatchWrapper(getItemsGlobally),
);

/**
 * @swagger
 * /item/:
 *  post:
 *    tags:
 *      - Items
 *    summary: add a item to Pack
 *    requestBody:
 *      required: false
 *    responses:
 *      200:
 *        description: Successful response
 */
router.post(
  '/global/select/:packId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  zodParser(validator.addGlobalItemToPack, 'body'),
  tryCatchWrapper(addGlobalItemToPack),
);
/**
 * @swagger
 * /item/:
 *  post:
 *    tags:
 *      - Items
 *    summary: edit a item in Pack
 *    requestBody:
 *      required: false
 *    responses:
 *      200:
 *        description: Successful response
 */
router.put(
  '/global/:itemId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  zodParser(validator.editGlobalItemAsDuplicate, 'params'),
  tryCatchWrapper(editGlobalItemAsDuplicate),
);

/**
 * @swagger
 * /item/:
 *  delete:
 *    tags:
 *      - Items
 *    summary: Delete an item by ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.delete(
  '/global/:itemId',
  authTokenMiddleware as any,
  checkRole(['user', 'admin']) as any,
  zodParser(validator.deleteGlobalItem, 'params'),
  tryCatchWrapper(deleteGlobalItem),
);

export default router;
