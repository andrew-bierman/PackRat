import { PaginationParams } from '../../helpers/pagination';
import { Item } from '../../drizzle/methods/Item';

interface GetItemsFeedParams {
  pagination?: PaginationParams;
  searchTerm?: string;
  queryBy?: string;
}
export const getItemsFeedService = async ({
  pagination,
  searchTerm,
  queryBy,
}: GetItemsFeedParams) => {
  const itemClass = new Item();

  const { data, totalCount } = await itemClass.findFeed({
    searchTerm,
    pagination,
    queryBy,
  });

  return {
    data,
    totalCount,
  };
};
