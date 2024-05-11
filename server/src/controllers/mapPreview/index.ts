// import { MAPBOX_ACCESS_TOKEN } from '../../config';
import { MapPreviewError } from '../../helpers/errors';
import { type Context, type Next } from 'hono';

/**
 *  Responds with map preview image from mapbox api
 *
 * @param {Request} req - Request object
 * @param {Response} res - Respone object
 * @param {NextFunction} next - The next middleware
 * @returns {Promise} - Resolves with the preview image
 */
const getMapPreview = async (ctx: Context, next: Next) => {
  try {
    console.log('ctx.req.query ctx.req.query', ctx.req.query);

    const { env }: any = ctx;
    const { MAPBOX_ACCESS_TOKEN } = env;

    const queryParams = Object.entries(ctx.req.query).reduce(
      (acc, [key, val], i, arr) =>
        `${acc}${key}=${val}${i == arr.length - 1 ? '' : '&'}`,
      '',
    );

    const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${ctx.req.path
      .replace('/api', '')
      .replace('/mapPreview/', '')
      .replace(
        '?' + queryParams,
        '',
      )}?access_token=${MAPBOX_ACCESS_TOKEN}&${queryParams}`;

    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Failed to fetch map preview image', response);
    }

    const newResponse = new Response(response.body, {
      headers: {
        'Content-Type': 'image/png',
      },
    });

    console.log('newResponse', newResponse);

    return newResponse;
  } catch (error) {
    console.log(error);
    next(MapPreviewError);
  }
};

export default getMapPreview;
