import { FC } from 'react';

export const disableScreen =
  <T extends {}>(Component: FC<T>, checkDisabled?: (props: T) => boolean) =>
  (props: T) => {
    if (!checkDisabled || checkDisabled(props)) {
      return null;
    }

    return <Component {...props} />;
  };
