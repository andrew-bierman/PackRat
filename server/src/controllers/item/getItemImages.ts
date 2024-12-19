import { protectedProcedure } from '../../trpc';
import { getItemImagesByIdService } from '../../services/item/item.service';
import { z } from 'zod';
import { type Context } from 'hono';

export const getItemImages = async (c: Context) => {
  try {
    const { id } = await c.req.param();
    const item = await getItemImagesByIdService(id);
    return c.json({ item }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function getItemImagesRoute() {
  return protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty('ID cant be empty'),
      }),
    )
    .query(async (opts) => {
      const { id } = opts.input;
      const item = await getItemImagesByIdService(id);
      return item;
    });
}
