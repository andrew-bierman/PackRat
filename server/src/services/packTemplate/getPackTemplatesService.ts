import { PackTemplate, type Filter } from 'src/drizzle/methods/PackTemplate';

export async function getPackTemplatesService(filter?: Filter) {
  const packTemplateHelper = new PackTemplate();
  return await packTemplateHelper.findMany(filter);
}
