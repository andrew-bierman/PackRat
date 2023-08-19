import { Application, Request, Response } from 'express';
import Base from '../Base';
import { getFavoritePacksByUser } from './getFavoritePacksByUser';
import { getUserFavorites } from './getUserFavorites';
import { addToFavorite } from '../user';
import * as validator from "../../middleware/validators/index";

export default class FavoriteController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/favorite', this.router);
        express.use("/api/favorite", this.router);
        /**
         * @swagger
         * /favorite:
         *   post:
         *     summary: Add to favorite
         *     tags: [Favorite]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               packId:
         *                 type: string
         *               userId:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful response adding to favorite
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error adding to favorite
         */
        this.router.post("/", validator.addToFavorite, addToFavorite);

        /**
         * @swagger
         * /favorite/user/{userId}:
         *   get:
         *     summary: Get favorites of a user
         *     tags: [Favorite]
         *     parameters:
         *       - in: path
         *         name: userId
         *         schema:
         *           type: string
         *         required: true
         *         description: ID of the user
         *     responses:
         *       '200':
         *         description: Successful response with user's favorites
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error retrieving favorites
         */
        this.router.get("/user/:userId", getUserFavorites);

        /**
         * @swagger
         * /favorite/user/{userId}/packs:
         *   get:
         *     summary: Get favorite packs of a user
         *     tags: [Favorite]
         *     parameters:
         *       - in: path
         *         name: userId
         *         schema:
         *           type: string
         *         required: true
         *         description: ID of the user
         *     responses:
         *       '200':
         *         description: Successful response with user's favorite packs
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error retrieving favorite packs
         */
        this.router.get("/user/:userId/packs", getFavoritePacksByUser);
    }
}