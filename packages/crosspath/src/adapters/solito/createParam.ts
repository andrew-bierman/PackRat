import { createParam as createParamSolito } from 'solito';
import { CreateParam } from '../../model';

export const createParam: CreateParam = () => {
  const { useParam } = createParamSolito();

  return { useParam };
};
