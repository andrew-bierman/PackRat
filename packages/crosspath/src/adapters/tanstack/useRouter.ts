import { useNavigate, ToOptions } from '@tanstack/react-router';
import { Router, URL } from '../../model';

export function useRouter(): Router {
  const navigate = useNavigate();

  const push = (url: URL) => {
    switch (typeof url) {
      case 'string':
        navigate({
          to: url,
        });
        break;
      case 'object':
        navigate({ to: url.pathname, search: url.query, state: url.state });
        break;
    }
  };

  const replace = (url: URL) => {
    switch (typeof url) {
      case 'string':
        navigate({
          to: url,
        });
        break;
      case 'object':
        navigate({ to: url.pathname, search: url.query, state: url.state });
        break;
    }
  };

  const back = () => {
    // @ts-ignore
    navigate(-1);
  };

  return { push, replace, back };
}
