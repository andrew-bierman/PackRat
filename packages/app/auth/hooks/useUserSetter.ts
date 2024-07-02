import { useCallback } from 'react';
import { queryTrpc } from 'app/trpc';
import { type User } from '../ts';

export const useUserSetter = () => {
  const utils = queryTrpc.useUtils();

  const setUser = useCallback(
    (data: User | null) => utils.getMe.setData(null, data),
    [utils],
  );

  return setUser;
};
