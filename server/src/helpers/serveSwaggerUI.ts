import {ItemCategory} from '../utils/itemCategory.ts'
import {ItemCategoryModel} from '../models/itemCategory.ts'
import swaggerUi from "swagger-ui-express";
import specs from "../swaggerOptions.ts";
import { Request, Response } from 'express';

export const serveSwaggerUI = (app: any) => {
  if (process.env.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve);
    app.get("/api-docs", swaggerUi.setup(specs));
    app.get('/swagger.json', (req:Request, res:Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(specs);
    });

    app.get('/seed/category', (req:Request, res:Response) => {
      console.log('Seeding...')
      ItemCategory.forEach(async (category) => {
        await ItemCategoryModel.create({
          name: category
        });
      })
      res.status(200).send('Seeding done')
    })
  }
}