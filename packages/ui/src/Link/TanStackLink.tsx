import { Link } from '@tanstack/react-router';

export const TanStackLink = (props) => {
  return <Link to={props.href} {...props} />;
};
