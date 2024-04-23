import {
  useParams as useTanstackParams,
  useSearch,
} from '@tanstack/react-router';
import { useRouter } from './useRouter';
import { CreateParam, CreateParamOptions } from '../../model';

export const createParam: CreateParam = <T>() => ({
  useParam: useParam<T>,
  useParams: useParams<T>,
});

const useParam = <T>(
  key: keyof T,
  options: CreateParamOptions,
): [value: any, setValue: (value: any) => void] => {
  const { initial, parse, stringify } = options || {};
  const { push } = useRouter();
  const screenParams = useTanstackParams({ strict: false }) || {};
  const searchParams = useSearch({ strict: false }) || {};

  const param = screenParams[key] || searchParams[key] || initial;
  const parsedParam = parse ? parse(param) : param;

  const setParam = (value: any) => {
    if (screenParams[key]) {
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
  const params = { ...screenParams, ...searchParams };

  const setParams = (value: Partial<T>) => {
    if (Object.keys(value).some((key) => screenParams.hasOwnProperty(key))) {
      return console.error("You can't update screen params");
    }

    push({ query: { ...searchParams, ...value } });
  };

  return { params, setParams };
};
