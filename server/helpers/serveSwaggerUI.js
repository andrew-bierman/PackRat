import {ItemCategory} from '../utils/itemCategory.js'
import {ItemCategoryModel} from '../models/itemCategory.js'
import swaggerUi from "swagger-ui-express";
import specs from "../swaggerOptions.js";

export const serveSwaggerUI = (app) => {
  if (process.env.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve);
    app.get("/api-docs", swaggerUi.setup(specs));
    app.get('/swagger.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(specs);
    });

    app.get('/seed/category', (req, res) => {
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