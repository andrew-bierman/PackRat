import { publicProcedure, protectedProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import { postSingleGeoJSONService } from '../../services/osm/osm.service';
import { z } from 'zod';

/**
 * Handles the POST request for a single GeoJSON.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {void} - does not return a value
 */
// export const postSingleGeoJSON = async (req, res) => {
//   console.log('in postSingleGeoJSON');
//   const geojson = req.body;

//   const result = await postSingleGeoJSONService(geojson);
//   res.locals.data = result;
//   responseHandler(res);
// };

export function postSingleGeoJSONRoute() {
  return protectedProcedure
    .input(z.object({ geojson: z.any() }))
    .mutation(async (opts) => {
      const { geojson } = opts.input;
      return await postSingleGeoJSONService(geojson);
    });
}
