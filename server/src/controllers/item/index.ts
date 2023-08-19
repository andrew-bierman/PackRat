import { Application, Request, Response } from 'express';
import Base from '../Base';
import * as validator from "../../middleware/validators/index";
import { getItems } from './getItems';
import { getItemById } from './getItemById';
import { searchItemsByName } from './searchItemsByName';
import { addItem } from './addItem';
import { editItem } from './editItem';
import { deleteItem } from './deleteItem';
import { addItemGlobal } from './addItemGlobal';
import { getItemsGlobally } from './getItemsGlobally';
import { addGlobalItemToPack } from './addGlobalItemToPack';
import { editGlobalItemAsDuplicate } from './editGlobalItemAsDuplicate';
import { deleteGlobalItem } from './deleteGlobalItem';


export default class ItemsController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/item', this.router);
        express.use("/api/item", this.router);

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
        this.router.get("/packItems/:packId", validator.getItems, getItems);

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
        this.router.get("/i/:packId", validator.getItemById, getItemById);

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
        this.router.get("/search", searchItemsByName);

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
        this.router.post("/", validator.addItem, addItem);

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
        this.router.put("/", validator.editItem, editItem);

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
        this.router.delete("/", validator.deleteItem, deleteItem);

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
        this.router.post("/global", validator.addItemGlobal, addItemGlobal);

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
        this.router.get("/global", getItemsGlobally);

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
        this.router.post("/global/select/:packId", addGlobalItemToPack);
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
        this.router.put("/global/:itemId", editGlobalItemAsDuplicate);

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
        this.router.delete("/global/:itemId", deleteGlobalItem);
    }
}
