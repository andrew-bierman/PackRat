import {
  useParams as useTanstackParams,
  useSearch,
} from '@tanstack/react-router';
import { useRouter } from './useRouter';
import { CreateParamOptions } from '../../model';

export type CreateParam = {
  useParam: <T extends object>(
    key: keyof T,
    options?: CreateParamOptions,
  ) => [value: any, setValue: (value: any) => void];
  useParams: <T extends object>() => {
    params: T;
    setParams: (value: Partial<T>) => void;
  };
};

const useParam = <T extends object>(
  key: keyof T,
  options: CreateParamOptions,
): [value: any, setValue: (value: any) => void] => {
  const { initial, parse, stringify } = options || {};
  const { push } = useRouter();
  const screenParams = (useTanstackParams({ strict: false }) ||
    {}) as Partial<T>;
  const searchParams = (useSearch({ strict: false }) || {}) as Partial<T>;
  console.log({ searchParams });

  const param = screenParams[key] || searchParams[key] || initial;
  const parsedParam = parse ? parse(param as any) : param;

  const setParam = (value: any) => {
    if (key in screenParams) {
      return console.error("You can't update screen params");
    }
    const stringifiedValue = stringify ? stringify(value) : value;
    console.log('aaaa', { ...searchParams, [key]: stringifiedValue });

    push({ query: { ...searchParams, [key]: stringifiedValue } });
  };

  return [parsedParam, setParam];
};

const useParams = <T>(): {
  params: T;
  setParams: (value: Partial<T>) => void;
} => {
  const { push } = useRouter();
  const screenParams = (useTanstackParams({ strict: false }) || {}) as T;
  const searchParams = (useSearch({ strict: false }) || {}) as T;
  const params = { ...screenParams, searchParams };

  const setParams = (value: Partial<T>) => {
    if (
      Object.keys(value).some((key) =>
        (screenParams as object).hasOwnProperty(key),
      )
    ) {
      return console.error("You can't update screen params");
    }

    push({ query: { ...searchParams, ...value } });
  };

  return { params, setParams };
};

export const createParam: CreateParam = {
  useParam,
  useParams,
};
