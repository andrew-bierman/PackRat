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
  (req, res, next) => zodParser(validator.getItems, req.body, next),
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
  '/i/:packId',
  (req, res, next) => zodParser(validator.getItemById, req.body, next),
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
  authTokenMiddleware,
  checkRole(['user', 'admin']),
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
  (req, res, next) => zodParser(validator.addItem, req.body, next),
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
  (req, res, next) => zodParser(validator.editItem, req.body, next),
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
  (req, res, next) => zodParser(validator.deleteItem, req.body, next),
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
  (req, res, next) => zodParser(validator.addItemGlobal, req.body, next),
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
  authTokenMiddleware,
  checkRole(['user', 'admin']),
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
  authTokenMiddleware,
  checkRole(['user', 'admin']),
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
  authTokenMiddleware,
  checkRole(['user', 'admin']),
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
  authTokenMiddleware,
  checkRole(['user', 'admin']),
  tryCatchWrapper(deleteGlobalItem),
);

export default router;
