import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'app/constants/pagination';
import { createParam, useRouter } from '@packrat/crosspath';

const { useParam } = createParam<{ limit: number; page: number }>();

export const usePagination = () => {
  const { push } = useRouter();
  const [limit] = useParam('limit', {
    initial: String(DEFAULT_LIMIT),
    parse: parseParam,
  });
  const [page, setPage] = useParam('page', {
    initial: String(DEFAULT_PAGE),
    parse: parseParam,
  });

  return {
    handleLimitChange: (newLimit) => {
      push({ query: { limit: Number(newLimit), page: 1 } });
    },
    handlePageChange: (newPage) => {
      setPage(Number(newPage));
    },
    limit: Number(limit),
    page: Number(page),
  };
};

const parseParam = (param) => Number(param);
