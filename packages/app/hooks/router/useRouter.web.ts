// Dynamic import alternative that adheres to React's rules

// Static imports
import { useSolitoRouter } from './useSolitoRouter';
import { useTanStackRouter } from './useTanStackRouter';

function useRouterFactory() {
  // Directly return the hook based on the condition
  if (process.env.NEXT_PUBLIC_USE_SOLITO_ROUTER === 'true') {
    return useSolitoRouter;
  } else {
    return useTanStackRouter;
  }
}

export const useRouter = useRouterFactory();
