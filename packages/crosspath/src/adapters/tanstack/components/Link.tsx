import { Link as TanstackLink } from '@tanstack/react-router';
import { LinkProps } from 'solito/link';

export const Link = (props: LinkProps) => {
  return <TanstackLink to={props.href} {...props} />;
};
