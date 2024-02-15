// Static imports
import { useParamSolito } from './useParamSolito';
import { useParamTanStack } from './useParamTanStack';
import { NEXT_PUBLIC_ROUTER } from '@env';

function useParamFactory() {
  // Directly return the hook based on the condition
  if (NEXT_PUBLIC_ROUTER === 'solito') {
    // return useParamSolito;
  } else {
    return useParamTanStack;
  }
}

export const useParam = useParamFactory();
