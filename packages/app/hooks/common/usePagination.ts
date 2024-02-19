import { useState } from 'react';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'app/constants/pagination';
import { useSearchParams } from './useSearchParams';

export const usePagination = () => {
  const searchParams = useSearchParams();
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');

  const handleLimitChange = (newLimit: number) => {
    searchParams.set('limit', newLimit);
  };

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', newPage);
  };

  return {
    handleLimitChange,
    handlePageChange,
    limit: limit ? +limit : DEFAULT_LIMIT,
    page: page ? +page : DEFAULT_PAGE,
  };
};
