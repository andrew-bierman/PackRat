import { useRef } from 'react';
import { useSearchParams } from './useSearchParams';

export const useSearchParam = (key, defaultValue = '') => {
  const searchParams = useSearchParams();
  const isUpdated = useRef(false);
  const param = searchParams.get(key);

  const finalParam = !param && !isUpdated.current ? defaultValue : param;

  const setParam = (value) => {
    isUpdated.current = true;
    searchParams.set(key, value);
  };

  return [finalParam, setParam];
};
