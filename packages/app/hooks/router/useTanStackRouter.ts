import { useNavigate, ToOptions } from '@tanstack/react-router';

export function useTanStackRouter() {
  const navigate = useNavigate();

  const push = (props: ToOptions) => {
    const { href } = props;

    navigate({
      to: href,
    });
  };

  const replace = (url, as, options) => {
    navigate(url, { replace: true, state: options?.state });
  };

  const back = () => {
    navigate(-1);
  };

  // Assuming parseNextPath is a utility function you need, you'd have to implement it based on your needs
  const parseNextPath = (url) => {
    // Your implementation here
    return parsedUrl;
  };

  return { push, replace, back, parseNextPath };
}
