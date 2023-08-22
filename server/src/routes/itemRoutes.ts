import express from "express";
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
} from "../controllers/item/index";
import * as validator from "../middleware/validators/index";
import { tryCatchWrapper } from "../helpers/tryCatchWrapper";

const router = express.Router();

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
router.get("/packItems/:packId", validator.getItems, tryCatchWrapper(getItems));

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
router.get("/i/:packId", validator.getItemById, tryCatchWrapper(getItemById));

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
router.get("/search", tryCatchWrapper(searchItemsByName));

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
router.post("/", validator.addItem, tryCatchWrapper(addItem));

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
 *              _id:
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
router.put("/", validator.editItem, tryCatchWrapper(editItem));

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
 *              _id:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.delete("/", validator.deleteItem, tryCatchWrapper(deleteItem));

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
router.post("/global", validator.addItemGlobal, tryCatchWrapper(addItemGlobal));

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
router.get("/global", tryCatchWrapper(getItemsGlobally));

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
router.post("/global/select/:packId", tryCatchWrapper(addGlobalItemToPack));
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
router.put("/global/:itemId", tryCatchWrapper(editGlobalItemAsDuplicate));

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
 *              _id:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response
 */
router.delete("/global/:itemId", tryCatchWrapper(deleteGlobalItem));

export default router;
