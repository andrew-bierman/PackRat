import { useUserQuery } from 'app/modules/auth';

export function SessionProvider(props) {
  useUserQuery();

  return props.children;
}
