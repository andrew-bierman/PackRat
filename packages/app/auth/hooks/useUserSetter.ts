import { useCallback } from 'react';
import { getQueryKey } from '@trpc/react-query';
import { queryTrpc } from 'app/trpc';
import { type User } from '../ts';

export const useUserSetter = () => {
  const utils = queryTrpc.useUtils();
  const userKey = getQueryKey(queryTrpc.getMe, undefined, 'query');

  const setUser = useCallback(
    (data: User | null) => utils.getMe.setData(null, data),
    [utils, userKey],
  );

  return setUser;
};
