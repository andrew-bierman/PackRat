import { protectedProcedure } from '../../trpc';
import { ErrorFetchingGeoCodeError } from '../../helpers/errors';
import { geoCodeService } from '../../services/geocode/geoCodeService';

export const getGeoCode = async (c) => {
  try {
    const { addressArray } = await c.req.parseBody();
    const result: any = await geoCodeService({
      addressArray,
      geoCodeUri: c.env.GEO_CODE_URL,
      geoapifyKey: c.env.GEOAPIFY_KEY,
    });
    if (result.message === 'ok') {
      return c.json({ result: result.result }, 200);
    }
    return c.json({ error: ErrorFetchingGeoCodeError.message }, 500);
  } catch (error) {
    return c.json({ error: `Failed to get GeoCode: ${error.message}` }, 500);
  }
};

export function getGeoCodeRoute() {
  return protectedProcedure.query(async (opts) => {
    if (!opts.input) {
      throw new Error('Input is missing');
    }
    const { addressArray } = opts.input;
    const { env }: any = opts.ctx;
    const result: any = await geoCodeService({
      addressArray,
      geoCodeUri: env.GEO_CODE_URL,
      geoapifyKey: env.GEOAPIFY_KEY,
    });
    return result.message === 'ok' ? result.result : ErrorFetchingGeoCodeError;
  });
}
