import { useEffect } from 'react';
import { useRouter } from '@packrat/ui';

type RedirectProps = {
  to: string;
};

export const Redirect = ({ to }: RedirectProps) => {
  const router = useRouter();
  useEffect(() => {
    if (to) {
      router.replace(to);
    }
  }, [to]);

  return null;
};
