import osmtogeojson from 'osmtogeojson';
import axios from 'axios';
import {
  ErrorProcessingOverpassError,
  ErrorRetrievingOverpassError,
  InvalidRequestParamsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import * as validators from '@packrat/packages';
import { getOsmService } from '../../services/osm/getOsmService';
import { z } from 'zod';

/**
 * Retrieves OpenStreetMap data based on the provided activity type, start point, and end point.
 * @param {Object} req - The request object containing the activity type, start point, and end point.
 * @param {Object} res - The response object used to send the retrieved OpenStreetMap data.
 * @return {Promise<void>} - A promise that resolves when the OpenStreetMap data is successfully retrieved and sent.
 */
export const getOsm = async (req, res, next) => {
  console.log('req', req); // log the request body to see what it looks like
  try {
    const { activityType, startPoint, endPoint } = req.body;
    const result = await getOsmService({ activityType, startPoint, endPoint });
    res.locals.data = result;
    responseHandler(res);
  } catch (error) {
    next(ErrorRetrievingOverpassError);
  }
};

export function getOsmRoute() {
  return publicProcedure
    .input(
      z.object({
        activityType: z.string(),
        startPoint: z.object({ latitude: z.number(), longitude: z.number() }),
        endPoint: z.object({ latitude: z.number(), longitude: z.number() }),
      }),
    )
    .mutation(async (opts) => {
      try {
        const { activityType, startPoint, endPoint } = opts.input;
        return await getOsmService({ activityType, startPoint, endPoint });
      } catch (error) {
        throw ErrorRetrievingOverpassError;
      }
    });
}
