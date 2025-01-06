import { PackTemplate } from 'src/drizzle/methods/PackTemplate';

export async function getPackTemplateService(
  params: { id: string; name?: undefined } | { name: string; id?: undefined },
) {
  return await new PackTemplate().findPackTemplate(params);
}
