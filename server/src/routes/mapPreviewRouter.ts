import { Hono } from 'hono';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import getMapPreview from '../controllers/mapPreview';
import authTokenMiddleware from '../middleware/auth';
import checkRole from '../middleware/checkRole';

const router = new Hono();

/**
 * @swagger
 * /mapPreview/{mapQuery}:
 *  get:
 *   summary: get static image map preview
 *   tags:
 *    - Map image preview
 *   parameters:
 *    - in: path
 *      name: mapQuery
 *      schema:
 *       type: string
 *      required: true
 *      description: mapQuery is anything that comes after "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/" excluding access_token query param
 *   responses:
 *    200:
 *     content:
 *      image/png:
 *       schema:
 *        type: string
 *        format: binary
 *    500:
 *     description: Error getting map preview
 */
router.get(
  '/*',
  // tryCatchWrapper(getMapPreview)
  getMapPreview,
);

export default router;
