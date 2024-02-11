import express from 'express';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import getMapPreview from '../controllers/mapPreview';

const router = express.Router();

/**
 * @openapi
 * /mapPreview/{mapPreviewUri}:
 *  get:
 *   summary: gets map preview image from mapbox
 *   tags:
 *    - Map image preview
 *   parameters:
 *    - in: path
 *      name: mapPreviewUri
 *      schema:
 *       type: string
 *      required: true
 *      description: > 
 *       mapPreviewUri is anything that comes after _https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/_ excluding the access_token query param. See the [map box docs](https://docs.mapbox.com/api/maps/static-images/?size=n_10_n#retrieve-a-static-map-from-a-style).<br/>
 *       **NOTE:** Executing this from swagger won't work as [it encodes URI paths](https://github.com/swagger-api/swagger-js/issues/1210)(_mapPreviewUri_ in this case).
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
router.get('/*', tryCatchWrapper(getMapPreview));

export default router;
