import express, { NextFunction } from "express";
import cors from "cors";
import { isCelebrateError, errors } from "celebrate";
import bodyParser from "body-parser";
import { serveSwaggerUI } from "./helpers/serveSwaggerUI";
import { corsOptions } from "./helpers/corsOptions";
import http from 'http';
import registerRoutes from './routes';

export default class App {
    public express: express.Application;

    public httpServer: http.Server;

    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);
        this.middleware();
        this.routes();
        this.addErrorHandler();
    }

    /**
     * here register your all routes
     */
    private routes(): void {
        registerRoutes(this.express);
    }

    /**
     * here you can apply your middlewares
     */
    private middleware(): void {
        if (corsOptions) {
            this.express.use(cors(corsOptions as any));
        }
        this.express.use(bodyParser.json({ limit: "50mb" }));
        // app.use(express.urlencoded({ limit: "50mb", extended: true }));

        // const connectionString = " your connection string";

        // Serve the Swagger UI at /api-docs for api documentation, only in development
        serveSwaggerUI(this.express);
    }    

    private addErrorHandler(): void {
        // middleware to log Celebrate validation errors
        this.express.use((err: Error, req: express.Request, res: express.Response, next: NextFunction): void => {
            if (isCelebrateError(err)) {
                console.error(err);
            }
            next(err);
        });
        this.express.use(errors());
    }

}
