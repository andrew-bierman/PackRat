import {
  PackTemplate,
  type Filter,
  type ORDER_BY,
} from 'src/drizzle/methods/PackTemplate';
import {
  type PaginationParams,
  getPaginationResponse,
} from 'src/helpers/pagination';

export async function getPackTemplatesService(
  pagination: PaginationParams,
  filter?: Filter,
  orderBy?: ORDER_BY,
) {
  const packTemplateHelper = new PackTemplate();
  const { data, totalCount } = await packTemplateHelper.findMany({
    filter,
    orderBy,
    pagination,
  });

  return {
    data,
    totalCount,
    ...getPaginationResponse(pagination, totalCount),
  };
}
