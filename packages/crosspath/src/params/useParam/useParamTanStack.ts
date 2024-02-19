import { useParams } from '@tanstack/react-router';

export const useParamTanStack = (name: string) => {
  const params = useParams({ strict: false });
  console.log('params', params);
  console.log('name', name);
  console.log('params[name]', params[name]);

  const param = params[name] || null;
  return [param];
};
