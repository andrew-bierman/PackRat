import React, { useEffect, useState } from 'react';
import { getItemsGlobal } from '../../store/globalItemsStore';
import { executeOfflineRequests } from '../../store/offlineQueue';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '~/hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';

export const useItemsLogic = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [refetch, setRefetch] = useState(false);

  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const data = useSelector((state) => state.globalItems);
  const isLoading = useSelector((state) => state.globalItems.isLoading);
  const isError = useSelector((state) => state.globalItems.isError);
  const { isConnected, requests } = useSelector((state) => state.offlineQueue);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) {
      dispatch(executeOfflineRequests(requests));
    }
  }, []);

  useEffect(() => {
    if (isConnected && requests.length == 0)
      dispatch(getItemsGlobal({ limit, page }));
  }, [limit, page, refetch, isConnected]);

  return {
    isAddItemModalOpen,
    setIsAddItemModalOpen,
    currentTheme,
    limit,
    setLimit,
    page,
    setPage,
    refetch,
    setRefetch,
    data,
    isLoading,
    isError,
  };
};
