import { useState } from 'react';

export const usePagination = () => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return { handleLimitChange, handlePageChange, limit, page };
};
