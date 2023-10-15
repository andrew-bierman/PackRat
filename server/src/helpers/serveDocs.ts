import express, { type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from '../swaggerOptions';
import { renderTrpcPanel } from 'trpc-panel';
import { generateOpenApiDocument } from 'trpc-openapi';

/**
 * Serves the Swagger UI for the given router.
 *
 * @param {any} router - The router object.
 */
export const serveSwaggerUI = (router: any) => {
  router.use('/api', swaggerUi.serve);
  router.get('/api', swaggerUi.setup(specs));
  router.get('/api/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};

/**
 * Serves the tPRC panel for the given router.
 * @param {any} router - The router object.
 * @param {any} appRouter - The app router.
 */
export const serveTrpcPanel = (router: any, appRouter: any) => {
  router.use('/panel', (_, res) => {
    return res.send(
      renderTrpcPanel(appRouter, { url: 'http://localhost:3000/api/trpc' }),
    );
  });

  const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'tRPC OpenAPI',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000',
  });

  // Serve tRPC OpenAPI document
  router.get('/trpc/openapi.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(openApiDocument, null, 2));
  });
};

/**
 * Serves the landing page for the given router.
 * @param {any} router - The router object.
 */
export const serveDocsLandingPage = (router: any) => {
  router.get('/', (req: Request, res: Response) => {
    res.send(`
            <!DOCTYPE html>
            <html lang="en" class="dark">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Documentation</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <style>
                    .dark-theme {
                        background-color: #1f2937;
                        color: #fff;
                    }
                </style>
            </head>
            <body class="dark-theme">
                <section class="min-h-screen flex items-center justify-center p-4">
                    <div class="container">
                        <h1 class="text-4xl mb-8 text-center">Documentation</h1>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div class="card">
                                <div class="p-8 bg-gray-800 rounded-lg shadow-lg">
                                    <h2 class="text-2xl mb-4">Swagger UI</h2>
                                    <a href="/docs/api" class="block w-full px-4 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-700" target="_blank">Open</a>
                                </div>
                            </div>
                            <div class="card">
                                <div class="p-8 bg-gray-800 rounded-lg shadow-lg">
                                    <h2 class="text-2xl mb-4">tRPC Panel</h2>
                                    <a href="/docs/panel" class="block w-full px-4 py-2 bg-green-500 text-white text-center rounded-lg hover:bg-green-700" target="_blank">Open</a>
                                </div>
                            </div>
                            <div class="card">
                                <div class="p-8 bg-gray-800 rounded-lg shadow-lg">
                                    <h2 class="text-2xl mb-4">tRPC OpenAPI</h2>
                                    <a href="/docs/trpc/openapi.json" class="block w-full px-4 py-2 bg-red-500 text-white text-center rounded-lg hover:bg-red-700" target="_blank">Open</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
            </html>
        `);
  });
};

/**
 * Sets up the /docs routing to serve the Swagger UI, tRPC panel, and landing page.
 *
 * @param {any} app - The app object.
 * @param {any} appRouter - The app router.
 */
export const serveDocs = (app: any, appRouter: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const router = express.Router();

    serveSwaggerUI(router);
    serveTrpcPanel(router, appRouter);
    serveDocsLandingPage(router);

    app.use('/docs', router);
  }
};
