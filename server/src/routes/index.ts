import express, { type Request, type Response } from 'express';
import path from 'path';
import csrf from 'csurf';
import packRoutes from './packRoutes';
import itemRoutes from './itemRoutes';
import tripRoutes from './tripRoutes';
import weatherRoutes from './weatherRoutes';
import geoCodeRoutes from './geoCodeRoutes';
import getParkRoutes from './getParkRoutes';
import getTrailRoutes from './getTrailRoutes';
import osmRoutes from './osmRoutes';
import passwordResetRoutes from './passwordResetRoutes';
import openAiRoutes from './openAiRoutes';
import templateRoutes from './templateRoutes';
import favoriteRouters from './favoriteRoutes';
import userRoutes from './userRoutes';

import { Hono } from 'hono';
import { logger } from 'hono/logger';

const router = new Hono();

// Create a CSRF middleware
const csrfProtection = csrf({ cookie: true });

/**
 * Logs the incoming request method and path, and logs the finished request method, path, status code, and request body.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 */
// const logger = (req: Request, res: Response, next: express.NextFunction) => {
//   console.log(`Incoming ${req.method} ${req.path}`);
//   res.on('finish', () => {
//     console.log(`Finished ${req.method} ${req.path} ${c.statusCode}`);
//     console.log(`Body ${c.req.json()}`);
//   });
//   next();
// };

// use logger middleware in development
if (process.env.NODE_ENV !== 'production') {
  router.use(logger());
}

// use routes
router.route('/user', userRoutes);
router.route('/pack', packRoutes);
router.route('/item', itemRoutes);
router.route('/trip', tripRoutes);
router.route('/weather', weatherRoutes);
router.route('/geocode', geoCodeRoutes);
router.route('/getparks', getParkRoutes);
router.route('/gettrails', getTrailRoutes);
router.route('/osm', osmRoutes);
router.route('/password-reset', passwordResetRoutes);
router.route('/openai', openAiRoutes);
router.route('/template', templateRoutes);
router.route('/favorite', favoriteRouters);
router.route('/openai', openAiRoutes);

// Also listen to /api for backwards compatibility
router.route('/api/user', userRoutes);
router.route('/api/pack', packRoutes);
router.route('/api/item', itemRoutes);
router.route('/api/trip', tripRoutes);
router.route('/api/weather', weatherRoutes);
router.route('/api/geocode', geoCodeRoutes);
router.route('/api/getparks', getParkRoutes);
router.route('/api/gettrails', getTrailRoutes);
router.route('/api/osm', osmRoutes);
router.route('/api/password-reset', passwordResetRoutes);
router.route('/api/openai', openAiRoutes);
router.route('/api/template', templateRoutes);
router.route('/api/favorite', favoriteRouters);
router.route('/api/openai', openAiRoutes);

// // Static routes for serving the React Native Web app
// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();

//   // Serve the client's index.html file at the root route
//   router.get('/', (c) => {
//     // Attach the CSRF token cookie to the response
//     // res.cookie("XSRF-TOKEN", req.csrfToken());

//     res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
//   });

//   // Serve the static assets from the client's dist app
//   router.use(express.static(path.join(__dirname, '../client/dist')));

//   // Serve the client's index.html file at all other routes NOT starting with /api
//   router.get(/^(?!\/?api).*/, (c) => {
//     // res.cookie("XSRF-TOKEN", req.csrfToken());
//     res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
//   });
// }

// Attach the CSRF token to a specific route in development
// if (process.env.NODE_ENV !== 'production') {
//   router.get('/api/csrf/restore', (c) => {
//     // res.cookie("XSRF-TOKEN", req.csrfToken());
//     c.status(201).json({});
//   });
// }

export default router;
