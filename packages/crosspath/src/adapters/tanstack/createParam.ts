import {
  useParams as useTanstackParams,
  useSearch,
} from '@tanstack/react-router';
import { useRouter } from './useRouter';
import { CreateParam, CreateParamOptions } from '../../model/types';

export const createParam: CreateParam = () => ({
  useParam: (key, options) => {
    const { initial, parse, stringify } = options || {};
    const { push } = useRouter();
    const screenParams = useTanstackParams({ strict: false }) as any;
    const searchParams = useSearch({ strict: false }) as any;

    const rawParam = screenParams[key] || searchParams[key] || initial;
    const paramAsString = typeof rawParam === 'string' ? rawParam : '';
    const parsedParam = parse ? parse(paramAsString) : rawParam;

    const setParam = (value: any) => {
      if (screenParams[key]) {
        return console.error("You can't update screen params");
      }
      const stringifiedValue = stringify ? stringify(value) : value;
      console.log('aaaa', { ...searchParams, [key]: stringifiedValue });

      push({ query: { ...searchParams, [key]: stringifiedValue } });
    };

    return [parsedParam, setParam];
  },
  useParams: (key) => {
    const { push } = useRouter();
    const screenParams = useTanstackParams({ strict: false }) as any;
    const searchParams = useSearch({ strict: false }) as any;
    const params = { ...screenParams, ...searchParams };

    const setParams = (value: any) => {
      if (screenParams[key]) {
        return console.error("You can't update screen params");
      }

      push({ query: { ...searchParams, [key]: value } });
    };

    return { params, setParams };
  },
});
