import { publicProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import { postSingleGeoJSONService } from '../../services/osm/osm.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { InternalServerError } from '../../helpers/errors';

/**
 * Handles the POST request for a single GeoJSON.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {void} - does not return a value
 */
export const postSingleGeoJSON = async (req, res) => {
  console.log('in postSingleGeoJSON');
  const geojson = req.body;

  const result = await postSingleGeoJSONService(geojson);
  res.locals.data = result;
  responseHandler(res);
};

export function postSingleGeoJSONRoute() {
  return publicProcedure.input(z.object({ geojson: z.any() })).mutation(async (opts) => {
    try {
      const { geojson } = opts.input;
      return await postSingleGeoJSONService(geojson);
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
    }
  })
}