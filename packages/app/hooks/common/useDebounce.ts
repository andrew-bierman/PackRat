import debounce from 'lodash/debounce';
import { useCallback } from 'react';

const DEBOUNCE_TIME = 500;

export const useDebounce = (cb, deps = []) => {
  return useCallback(debounce(cb, DEBOUNCE_TIME), deps);
};
