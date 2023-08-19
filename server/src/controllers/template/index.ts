import { Application, Request, Response } from 'express';
import Base from '../Base';
import { getTemplates } from './getTemplates';
import { getTemplateById } from './getTemplateById';
import { addTemplate } from './addTemplate';
import { isAdmin } from '../../middleware/isAdmin';
import { editTemplate } from './editTemplate';
import { deleteTemplate } from './deleteTemplate';

export default class TemplatesController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/template', this.router);
        express.use("/api/template", this.router);
        /**
         * @swagger
         * tags:
         *   name: Templates
         *   description: Template routes
         */

        /**
         * @swagger
         * /template:
         *   get:
         *     summary: Get all templates
         *     tags: [Templates]
         *     responses:
         *       '200':
         *         description: Successful response with all templates
         *       '500':
         *         description: Error retrieving templates
         */
        this.router.get("/", getTemplates);

        /**
         * @swagger
         * /template/{templateId}:
         *   get:
         *     summary: Get template by ID
         *     tags: [Templates]
         *     parameters:
         *       - in: path
         *         name: templateId
         *         schema:
         *           type: string
         *         required: true
         *         description: The ID of the template
         *     responses:
         *       '200':
         *         description: Successful response with template by ID
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error retrieving template by ID
         */
        this.router.get("/:templateId", getTemplateById);

        /**
         * @swagger
         * /template:
         *   post:
         *     summary: Add a template
         *     tags: [Templates]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               type:
         *                 type: string
         *               templateId:
         *                 type: string
         *               isGlobalTemplate:
         *                 type: boolean
         *               createdBy:
         *                type: string
         *     responses:
         *       '200':
         *         description: Successful response after adding the template
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error adding the template
         */
        this.router.post("/", isAdmin, addTemplate);

        /**
         * @swagger
         * /template/{templateId}:
         *   put:
         *     summary: Edit a template
         *     tags: [Templates]
         *     parameters:
         *       - in: path
         *         name: templateId
         *         schema:
         *           type: string
         *         required: true
         *         description: The ID of the template
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               type:
         *                 type: string
         *               isGlobalTemplate:
         *                 type: boolean
         *     responses:
         *       '200':
         *         description: Successful response after editing the template
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error editing the template
         */
        this.router.put("/:templateId", isAdmin, editTemplate);

        /**
         * @swagger
         * /template/{templateId}:
         *   delete:
         *     summary: Delete a template
         *     tags: [Templates]
         *     parameters:
         *       - in: path
         *         name: templateId
         *         schema:
         *           type: string
         *         required: true
         *         description: The ID of the template
         *     responses:
         *       '200':
         *         description: Successful response after deleting the template
         *       '400':
         *         description: Invalid request parameters
         *       '500':
         *         description: Error deleting the template
         */
        this.router.delete(
            "/:templateId",
            isAdmin,
            deleteTemplate
        );
    }
}

