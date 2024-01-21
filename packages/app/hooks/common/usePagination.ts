import { router, useGlobalSearchParams } from 'expo-router';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'app/constants/pagination';

export const usePagination = () => {
  const { limit, page } = useGlobalSearchParams();

  const handleLimitChange = (newLimit) => {
    router.setParams({ limit: newLimit });
  };

  const handlePageChange = (newPage) => {
    router.setParams({ page: newPage });
  };

  return {
    handleLimitChange,
    handlePageChange,
    limit: limit ? +limit : DEFAULT_LIMIT,
    page: page ? +page : DEFAULT_PAGE,
  };
};
