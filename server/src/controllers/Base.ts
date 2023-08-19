import express, { Application, Request, Router, NextFunction } from 'express';
import path from "path";
import csrf from "csurf";


/**
 * Provides services common to all API methods
 */
export default abstract class Base {
    /**
     * express router
     * @type {Router}
     */
    protected router: Router;

    /**
     * initializes a new router
     */
    protected constructor() {
        this.router = Router();
    }

    /**
     * abstract method implemented by inherited class usually controllers that implements API router to register the application
     * @param express
     */
    public abstract register(express: Application): void;

    public csrf() {
        // Create a CSRF middleware
        const csrfProtection = csrf({ cookie: true });

        const logger = (req: Request, res: Response, next: NextFunction) => {
            console.log(`Incoming ${req.method} ${req.path}`);
            (res as any).on("finish", () => {
                console.log(`Finished ${req.method} ${req.path} ${(res as any).statusCode}`);
                console.log(`Body ${req.body}`);
            });
            next();
        };

        // use logger middleware in development
        if (process.env.NODE_ENV !== "production") {
            this.router.use(() => logger);
        }


        // Static routes for serving the React Native Web app
        if (process.env.NODE_ENV === "production") {
            const __dirname = path.resolve();

            // Serve the client's index.html file at the root route
            this.router.get("/", (req, res) => {
                // Attach the CSRF token cookie to the response
                // res.cookie("XSRF-TOKEN", req.csrfToken());

                res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
            });

            // Serve the static assets from the client's dist app
            this.router.use(express.static(path.join(__dirname, "../client/dist")));

            // Serve the client's index.html file at all other routes NOT starting with /api
            this.router.get(/^(?!\/?api).*/, (req, res) => {
                // res.cookie("XSRF-TOKEN", req.csrfToken());
                res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
            });
        }

        // Attach the CSRF token to a specific route in development
        if (process.env.NODE_ENV !== "production") {
            this.router.get("/api/csrf/restore", (req, res) => {
                // res.cookie("XSRF-TOKEN", req.csrfToken());
                res.status(201).json({});
            });
        }
    }
}
