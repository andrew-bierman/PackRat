// import { MAPBOX_ACCESS_TOKEN } from '../../config';
import { type Context, type Next } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

const getMapPreview = async (ctx: Context, next: Next) => {
  try {
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
      throw new Error('Failed to fetch map preview image');
    }

    const newResponse = new Response(response.body, {
      headers: {
        'Content-Type': 'image/png',
      },
    });

    console.log('newResponse', newResponse);

    // return newResponse;
    ctx.set('data', newResponse);
    return await responseHandler(ctx);
  } catch (error) {
    console.log(error);
    ctx.set('error', error.message);
    return await responseHandler(ctx);
    // next(MapPreviewError);
  }
};

export default getMapPreview;
