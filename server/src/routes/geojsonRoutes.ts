import { Context, Hono } from 'hono';
import { tryCatchWrapper } from '../helpers/tryCatchWrapper';
import {
  GeojsonStorageService,
  type ResourceType,
} from 'src/services/geojsonStorage';

const router = new Hono();

router.get(
  '/:resource/:resourceId',
  tryCatchWrapper(async (ctx: Context) => {
    try {
      const params = ctx.req.param();

      const object = await GeojsonStorageService.retrieve(
        params.resource as ResourceType,
        params.resourceId,
      );

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);

      return new Response(object.body, {
        headers,
      });
    } catch (error) {
      return ctx.json({ error: error.message }, 400);
    }
  }),
);

export default router;
