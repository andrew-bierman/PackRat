import { PackTemplate } from 'src/drizzle/methods/PackTemplate';

export async function getPackTemplateService(packTemplateId: string) {
  return await new PackTemplate().findPackTemplate(packTemplateId);
}
