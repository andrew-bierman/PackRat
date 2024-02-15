import { cache, useRef } from 'react';
import {
  useSearchParams as useSearchParamsSolito,
  useUpdateSearchParams,
} from '@packrat/ui';

export const useSearchParams = () => {
  const searchParams = useSearchParamsSolito();
  const updateSearchParams = useUpdateSearchParams();
  const timerId = useRef(null);
  const queue = useRef(Object.fromEntries(searchParams?.entries?.() || []));

  const get = (key) => {
    return searchParams?.get(key);
  };

  const updateQue = (newQue) => {
    queue.current = newQue;

    timerId.current = setTimeout(() => {
      if (!isNaN(timerId.current)) {
        clearTimeout(timerId.current);
      }

      updateSearchParams(queue.current);
    }, 500);
  };

  const set = (key, value) => {
    updateQue({ ...queue.current, [key]: String(value) });
  };

  const reset = (params) => {
    updateQue(params);
  };

  return {
    get,
    set,
    reset,
  };
};
