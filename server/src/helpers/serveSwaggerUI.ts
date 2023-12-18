import { ItemCategory } from '../utils/itemCategory';
import swaggerUi from 'swagger-ui-express';
import specs from '../swaggerOptions';
import { prisma } from '../prisma';
import { type Request, type Response } from 'express';
import { ItemCategoryName } from '@prisma/client/edge';

/**
 * Serves the Swagger UI for the given app.
 *
 * @param {any} app - The app object.
 */
export const serveSwaggerUI = (app: any) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(specs));
    app.get('/swagger.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(specs);
    });

    app.get('/seed/category', (req: Request, res: Response) => {
      console.log('Seeding...');
      ItemCategory.forEach(async (category) => {
        await prisma.itemCategory.create({
          data: {
            name: category as ItemCategoryName,
          },
        });
      });
      res.status(200).send('Seeding done');
    });
  }
};
