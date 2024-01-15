import { useRouter as useExpoRouter } from 'expo-router';

interface HrefObject {
  pathname?: string;
  /** Query parameters for the path. */
  params?: Record<string, any>;
}

type Href = HrefObject | string;

interface Router {
  push: (href: Href) => void;
}

export const useRouter = (): Router => {
  const { push } = useExpoRouter();

  return { push };
};
