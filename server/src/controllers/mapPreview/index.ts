// import { MAPBOX_ACCESS_TOKEN } from '../../config';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

const getMapPreview = async (ctx: Context) => {
  try {
    const { env }: any = ctx;
    const { MAPBOX_ACCESS_TOKEN } = env;

    const queryParams = Object.entries(await ctx.req.query).reduce(
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
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });

    return newResponse;
  } catch (error) {
    console.log(error);
    return ctx.json({ error: error.message }, 400);
    // next(MapPreviewError);
  }
};

export default getMapPreview;
