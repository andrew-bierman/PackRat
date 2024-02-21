import { cache, useRef } from 'react';
import {
  useSearchParams as useSearchParamsSolito,
  useUpdateSearchParams,
} from 'solito/navigation';

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

    // Clear any existing timer to prevent multiple updates
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      updateSearchParams(queue.current);
      // Clear the timerId after the update is done
      timerId.current = null;
    }, 500);
  };

  const set = (key, value) => {
    const entries = Object.fromEntries(searchParams.entries());
    updateQue({ ...entries, [key]: String(value) });
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
