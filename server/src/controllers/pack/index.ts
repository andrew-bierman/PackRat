import { Application, Request, Response } from 'express';
import Base from '../Base';
import * as validator from "../../middleware/validators/index";
import { getPublicPacks } from './getPublicPacks';
import { getPacks } from './getPacks';
import { getPackById } from './getPackById';
import { scorePack } from './scorePack';
import { addPack } from './addPack';
import { editPack } from './editPack';
import { deletePack } from './deletePack';
import { duplicatePublicPack } from './duplicatePublicPack';

export default class PackController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/pack', this.router);
        express.use("/api/pack", this.router);
        /**
         * @swagger
         * tags:
         *   name: Packs
         *   description: Pack routes
         */

        /**
         * @swagger
         * /pack:
         *   get:
         *     summary: Get public packs
         *     tags: [Packs]
         *     responses:
         *       '200':
         *         description: Successful response with public packs
         *       '500':
         *         description: Error retrieving public packs
         */
        this.router.get("/", getPublicPacks);

        /**
         * @swagger
         * /pack/{ownerId}:
         *   get:
         *     summary: Get packs by owner ID
         *     tags: [Packs]
         *     parameters:
         *       - in: path
         *         name: ownerId
         *         schema:
         *           type: string
         *         required: true
         *         description: The ID of the owner
         *     responses:
         *       '200':
         *         description: Successful response with packs by owner ID
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error retrieving packs by owner ID
         */
        this.router.get("/:ownerId", validator.getPacks, getPacks);

        /**
         * @swagger
         * /pack/p/{packId}:
         *   get:
         *     summary: Get pack by ID
         *     tags: [Packs]
         *     parameters:
         *       - in: path
         *         name: packId
         *         schema:
         *           type: string
         *         required: true
         *         description: The ID of the pack
         *     responses:
         *       '200':
         *         description: Successful response with pack by ID
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error retrieving pack by ID
         */
        this.router.get("/p/:packId", validator.getPackById, getPackById);

        /**
         * @swagger
         * /pack/score/{packId}:
         *   put:
         *     summary: Score a pack
         *     tags: [Packs]
         *     parameters:
         *       - in: path
         *         name: packId
         *         schema:
         *           type: string
         *         required: true
         *         description: The ID of the pack
         *     responses:
         *       '200':
         *         description: Successful response after scoring the pack
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error scoring the pack
         */
        this.router.put("/score/:packId", validator.getPackById, scorePack);

        /**
         * @swagger
         * /pack:
         *   post:
         *     summary: Add a pack
         *     tags: [Packs]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               owner_id:
         *                 type: string
         *               is_public:
         *                 type: boolean
         *     responses:
         *       '200':
         *         description: Successful response after adding the pack
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error adding the pack
         */
        this.router.post("/", validator.addPack, addPack);

        /**
         * @swagger
         * /pack:
         *   put:
         *     summary: Edit a pack
         *     tags: [Packs]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               _id:
         *                 type: string
         *               name:
         *                 type: string
         *               is_public:
         *                 type: boolean
         *     responses:
         *       '200':
         *         description: Successful response after editing the pack
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error editing the pack
         */
        this.router.put("/", validator.editPack, editPack);

        /**
         * @swagger
         * /pack:
         *   delete:
         *     summary: Delete a pack
         *     tags: [Packs]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               packId:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful response after deleting the pack
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error deleting the pack
         */
        this.router.delete("/", validator.deletePack, deletePack);

        /**
         * @swagger
         * /pack:
         *   post:
         *     summary: Duplicate a public pack
         *     tags: [Pack]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               packId:
         *                 type: string
         *     responses:
         *       '200':
         *         description: Successful response after duplicating the pack
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error duplicating the pack
         */
        this.router.post("/duplicate", validator.duplicatePublicPack, duplicatePublicPack);
    }
}
