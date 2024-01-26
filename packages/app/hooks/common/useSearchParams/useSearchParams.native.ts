import { useSearchParams as useSearchParamsExpo, router } from 'expo-router';

export const useSearchParams = () => {
  const searchParams = useSearchParamsExpo();

  const get = (key) => {
    return searchParams[key];
  };

  const set = (key, value) => {
    router.setParams({ [key]: value });
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
