import {
  PackTemplate,
  type Filter,
  type ORDER_BY,
} from '../../drizzle/methods/PackTemplate';
import {
  type PaginationParams,
  getPaginationResponse,
} from '../../helpers/pagination';

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
    ...getPaginationResponse(pagination, totalCount),
  };
}
