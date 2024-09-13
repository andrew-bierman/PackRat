import { PackTemplate } from 'src/drizzle/methods/PackTemplate';

export async function getPackTemplatesService() {
  const packTemplateHelper = new PackTemplate();
  return await packTemplateHelper.findMany();
}
