import { createParam } from '../createParam';

const { useParam } = createParam();

export const useParamSolito = (paramName) => {
  const [value, setValue] = useParam(paramName);
  return [value, setValue];
};
