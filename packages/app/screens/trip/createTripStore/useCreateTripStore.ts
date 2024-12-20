import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  createTripInitialState,
  createTripReducer,
  setDateRange as setDateRangeAction,
  setTripFormValue,
  type addTripKey,
} from './store';
import { useTripContext } from 'app/modules/trip/context/tripContext';

export const useCreateTripStore = (initialState = createTripInitialState) => {
  const [store, dispatch] = useReducer(createTripReducer, initialState);

  const setTripValue = useCallback(
    (name: addTripKey, value: any) => {
      dispatch(setTripFormValue(name, value));
    },
    [dispatch],
  );

  const setDateRange = (dateRange) => {
    dispatch(setDateRangeAction(dateRange));
  };

  return { store, setTripValue, setDateRange };
};

export const useCurrentTripStore = () => {
  const { tripStore } = useTripContext();
  return tripStore;
};
