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

      if (!object) {
        return ctx.json(
          {
            error: `Resource ${params.resource}/${params.resourceId} not found`,
          },
          404,
        );
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      ctx.header('etag', object.httpEtag);
      ctx.header('Content-Type', 'application/geo+json');
      const json = await object.json();

      return ctx.json(json);
    } catch (error) {
      return ctx.json({ error: error.message }, 500);
    }
  }),
);

export default router;
