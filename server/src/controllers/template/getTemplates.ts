import { Template } from '../../drizzle/methods/template';
import { protectedProcedure } from '../../trpc';

export const getTemplates = async (c) => {
  const templateClass = new Template();
  const templates = await templateClass.findMany();
  return c.json(templates, 200);
};

export function getTemplatesRoute() {
  const templateClass = new Template();
  return protectedProcedure.query(async (opts) => {
    const templates = await templateClass.findMany();
    return templates;
  });
}
