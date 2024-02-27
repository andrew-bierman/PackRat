import { useParams, useSearch } from '@tanstack/react-router';
import { useRouter } from './useRouter';
import { CreateParam } from '../../model';

const useParam = (
  key: string,
): [value: any, setValue: (value: any) => void] => {
  const { push } = useRouter();
  const screenParams = useParams({ strict: false }) || {};
  const searchParams = useSearch({ strict: false }) || {};

  const param = screenParams[key] || searchParams[key];

  const setParam = (value: any) => {
    if (screenParams[key]) {
      return console.error("You can't update screen params");
    }

    push({ query: { ...searchParams, [key]: value } });
  };

  return [param, setParam];
};

export const createParam: CreateParam = () => ({ useParam });
