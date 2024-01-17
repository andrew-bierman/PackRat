// useItems.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeOfflineRequests } from 'app/store/offlineQueue';
import { getItemsGlobal } from 'app/store/globalItemsStore';
import { checkNetworkConnected } from '~/utils/netInfo';

const useItems = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [refetch, setRefetch] = useState(false);

  const { isConnected, requests } = useSelector((state) => state.offlineQueue);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) {
      dispatch(executeOfflineRequests(requests));
    }
  }, []);

  useEffect(() => {
    const fetchGlobalItems = async () => {
      if (isConnected && requests.length === 0) {
        dispatch(getItemsGlobal({ limit, page }));
      }
    };

    fetchGlobalItems();
  }, [limit, page, refetch, isConnected]);

  const data = useSelector((state) => state.globalItems);
  const isLoading = useSelector((state) => state.globalItems.isLoading);
  const isError = useSelector((state) => state.globalItems.isError);

  const toggleAddItemModal = () => {
    setIsAddItemModalOpen((prev) => !prev);
  };

  const handleRefetch = () => {
    setRefetch((prev) => !prev);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return {
    isAddItemModalOpen,
    toggleAddItemModal,
    data,
    isLoading,
    isError,
    limit,
    handleLimitChange,
    page,
    handlePageChange,
    refetch,
    handleRefetch,
  };
};

export default useItems;
