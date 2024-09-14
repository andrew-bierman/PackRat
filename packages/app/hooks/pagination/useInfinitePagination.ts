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
  nextPage?: number;
  enabled?: boolean;
  defaultPage?: number;
}

export const useInfinitePagination = (
  fetchFunction: () => void,
  paginationParams: PaginationParams,
  setPaginationParams: Dispatch<SetStateAction<PaginationParams>>,
  options: PaginationOptions = {},
) => {
  const initialRender = useRef(false);
  const { nextPage, enabled = true } = options;

  const fetchNextPage = () => {
    setPaginationParams((prev) => ({
      ...prev,
      offset: nextPage,
    }));
  };

  useEffect(() => {
    const run = () => {
      if (!initialRender.current) {
        initialRender.current = true;
        return;
      }
      if (!enabled) {
        return;
      }

      fetchFunction();
    };

    run();
  }, [paginationParams.limit, paginationParams.offset, enabled]);

  return { fetchNextPage };
};

function getOffset(page: number, limit: number) {
  return (page - 1) * limit;
}
