import { useState } from 'react';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'app/constants/pagination';

export const usePagination = () => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [page, setPage] = useState(DEFAULT_LIMIT);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return {
    handleLimitChange,
    handlePageChange,
    limit: limit ? +limit : DEFAULT_LIMIT,
    page: page ? +page : DEFAULT_PAGE,
  };
};
