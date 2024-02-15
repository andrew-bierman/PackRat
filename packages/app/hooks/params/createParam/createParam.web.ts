// Dynamic import alternative that adheres to React's rules

// Static imports
import { createParamSolito } from './createParamSolito';
import { createParamTanStack } from './createParamTanStack';
import { NEXT_PUBLIC_ROUTER } from '@env';

function useCreateParamFactory() {
  // Directly return the hook based on the solitocondition
  if (NEXT_PUBLIC_ROUTER === 'solito') {
    return createParamSolito;
  } else {
    return createParamTanStack;
  }
}

export const createParam = useCreateParamFactory();
