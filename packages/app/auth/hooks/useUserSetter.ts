import { useCallback } from 'react';
import { getQueryKey } from '@trpc/react-query';
import { queryTrpc } from 'app/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { type User } from '../ts';

export const useUserSetter = () => {
  const queryClient = useQueryClient();
  const userKey = getQueryKey(queryTrpc.getMe, undefined, 'query');

  const setUser = useCallback(
    (data: User | null) => queryClient.setQueryData(userKey, data),
    [queryClient, userKey],
  );

  return setUser;
};
