import { type Context } from 'hono';
import { Template } from '../../drizzle/methods/template';
import { protectedProcedure } from '../../trpc';

export const getTemplates = async (c: Context) => {
  try {
    const templateClass = new Template();
    const templates = await templateClass.findMany();
    return c.json(templates, 200);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};

export function getTemplatesRoute() {
  const templateClass = new Template();
  return protectedProcedure.query(async (opts) => {
    const templates = await templateClass.findMany();
    return templates;
  });
}
