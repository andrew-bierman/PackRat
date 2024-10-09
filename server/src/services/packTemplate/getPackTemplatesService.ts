import {
  PackTemplate,
  type Filter,
  type ORDER_BY,
} from 'src/drizzle/methods/PackTemplate';

export async function getPackTemplatesService({
  filter,
  orderBy,
}: {
  filter?: Filter;
  orderBy?: ORDER_BY;
}) {
  const packTemplateHelper = new PackTemplate();
  return await packTemplateHelper.findMany({ filter, orderBy });
}
