// Dynamic import alternative that adheres to React's rules

// Static imports
// import { useSolitoRouter } from './useSolitoRouter';
import { useTanStackRouter } from './useTanStackRouter';

function useRouterFactory() {
  // Directly return the hook based on the condition
  if (false) {
    // For client-side determination, ensure the environment variable is accessible
    // return useSolitoRouter;
  } else {
    return useTanStackRouter;
  }
}

export const useRouter = useRouterFactory();
