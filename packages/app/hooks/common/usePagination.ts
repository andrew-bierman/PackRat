import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'app/constants/pagination';
import { createParam } from '@packrat/crosspath';

type ParamsType = { limit: string; page: string };
const { useParams } = createParam<ParamsType>();

export const usePagination = () => {
  const { params, setParams } = useParams('limit');
  const { limit, page } = params;

  return {
    handleLimitChange: (newLimit) => {
      setParams({ limit: Number(newLimit), page: 1 });
    },
    handlePageChange: (newPage) => {
      setParams({ page: Number(newPage) });
    },
    limit: limit ? Number(limit) : DEFAULT_LIMIT,
    page: page ? Number(page) : DEFAULT_PAGE,
  };
};

const parseParam = (param) => Number(param);
