import express from "express";
import {
  getItems,
  getItemById,
  addItem,
  editItem,
  deleteItem,
  searchItemsByName,
} from "../controllers/itemController.js";
import * as validator from "../middleware/validators/index.js";
import {auth} from '../middleware/auth.js'
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
router.get("/packItems/:packId", validator.getItems, getItems);

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
router.get("/i/:packId", validator.getItemById, getItemById);

/**
 * @swagger
 * /item/search:
 *  get:
 *    tags:
 *      - Items
 *    security:
 *      - bearerAuth: []
 *    summary: Search items by name
 *    responses:
 *      200:
 *        description: Successful response
 */
router.get("/search", auth,searchItemsByName);

/**
 * @swagger
 * /item/:
 *  post:
 *    tags:
 *      - Items
 *    security:
 *      - bearerAuth: []
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
router.post("/", validator.addItem,auth, addItem);

/**
 * @swagger
 * /item/:
 *  put:
 *    tags:
 *      - Items
 *    security:
 *      - bearerAuth: []
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
router.put("/", validator.editItem, auth,editItem);

/**
 * @swagger
 * /item/:
 *  delete:
 *    tags:
 *      - Items
 *    security:
 *      - bearerAuth: []
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
router.delete("/", validator.deleteItem, auth,deleteItem);

export default router;
