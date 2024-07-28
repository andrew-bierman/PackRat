import { Link as TanstackLink } from '@tanstack/react-router';
import { LinkProps } from 'solito/link';
import { LinkComponent } from '../../../model';

export const Link: LinkComponent = (props: LinkProps) => {
  // @ts-ignore
  return <TanstackLink to={props.href} {...props} />;
};

export const TextLink: LinkComponent = (props: LinkProps) => {
  // @ts-ignore
  return <TanstackLink to={props.href} {...props} />;
};
