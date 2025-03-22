import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react';

const DEFAULT_LIMIT = 20;

export const getPaginationInitialParams = (defaultPage = 1) => ({
  limit: DEFAULT_LIMIT,
  offset: getOffset(defaultPage, DEFAULT_LIMIT),
});

export interface PaginationParams {
  limit: number;
  offset: number;
}

interface PaginationOptions {
  prevPage?: number | false;
  nextPage?: number | false;
  enabled?: boolean;
  defaultPage?: number;
}

export const usePagination = (
  fetchFunction: () => void,
  paginationParams: PaginationParams,
  setPaginationParams: Dispatch<SetStateAction<PaginationParams>>,
  options: PaginationOptions = {},
) => {
  const initialRender = useRef(false);
  const { prevPage, nextPage, enabled = true } = options;

  const fetchPrevPage = () => {
    if (prevPage === false) {
      return;
    }
    setPaginationParams((prev) => ({
      ...prev,
      offset: typeof prevPage === 'number' ? prevPage : prev.offset,
    }));
  };

  const fetchNextPage = () => {
    if (nextPage === false) {
      return;
    }
    setPaginationParams((prev) => ({
      ...prev,
      offset: typeof nextPage === 'number' ? nextPage : prev.offset,
    }));
  };

  useEffect(() => {
    const run = async () => {
      if (!initialRender.current) {
        initialRender.current = true;
        return;
      }
      if (!enabled) {
        return;
      }

      try {
        await fetchFunction();
      } catch (error) {
        console.error('Error fetching pagination data:', error);
      }
    };

    run();
  }, [paginationParams.limit, paginationParams.offset, enabled]);

  return { fetchPrevPage, fetchNextPage };
};

function getOffset(page: number, limit: number) {
  return (page - 1) * limit;
}

export interface PaginationReturn {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
}
