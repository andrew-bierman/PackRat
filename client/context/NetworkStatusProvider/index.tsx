import React, { createContext, useEffect } from 'react';
// import { store } from '../store/store';
import { useDispatch } from 'react-redux';
import { setNetworkStatus } from '../../store/offlineQueue';
import { checkNetworkConnected } from '~/utils/netInfo';

const NetworkStatusContext = createContext();

export function NetworkStatusProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    checkNetworkConnected.then((res) => {
      dispatch(setNetworkStatus(res));
    });
  }, []);

  return (
    <NetworkStatusContext.Provider>{children}</NetworkStatusContext.Provider>
  );
}
