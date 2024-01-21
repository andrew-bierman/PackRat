import {
  useSearchParams as useSearchParamsNext,
  usePathname,
  useRouter,
} from 'next/navigation';
import { useRef } from 'react';

export const useSearchParams = () => {
  const searchParams = useSearchParamsNext();
  const pathname = usePathname();
  const router = useRouter();
  const cache = useRef('');

  const get = (key) => {
    return searchParams.get(key);
  };

  const set = (key, value) => {
    const instance = getSearchParamsInstance(searchParams, cache.current);
    instance.set(key, value);
    const search = saveSearchParamsInstance(instance);
    cache.current = search;

    router.push(`${pathname}/${search}`);
    setTimeout(() => {
      cache.current = '';
    }, 2000);
  };

  return {
    get,
    set,
  };
};

const getSearchParamsInstance = (searchParams, cachedValue) => {
  return new URLSearchParams(cachedValue || Array.from(searchParams.entries()));
};

const saveSearchParamsInstance = (instance) => {
  const search = instance.toString();

  return search ? `?${search}` : '';
};
