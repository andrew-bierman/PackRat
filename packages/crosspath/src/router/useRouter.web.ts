// Dynamic import alternative that adheres to React's rules

// Static imports
import { useSolitoRouter } from './useSolitoRouter';
import { useTanStackRouter } from './useTanStackRouter';
import { NEXT_PUBLIC_ROUTER } from '@env';

function useRouterFactory() {
  // Directly return the hook based on the solitocondition
  if (NEXT_PUBLIC_ROUTER === 'solito') {
    return useSolitoRouter;
  } else {
    return useTanStackRouter;
  }
}

export const useRouter = useRouterFactory();
