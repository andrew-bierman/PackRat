import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { format } from 'date-fns';
import {
  createTripInitialState,
  createTripReducer,
  setDateRange as setDateRangeAction,
  setTripFormValue,
  type addTripKey,
} from './store';
import { useValidateSchema } from 'app/hooks/common';
import { addTripDetails } from '@packrat/validations';

export const useCreateTripStore = () => {
  const [store, dispatch] = useReducer(
    createTripReducer,
    createTripInitialState,
  );

  const setTripValue = useCallback(
    (name: addTripKey, value: any) => {
      dispatch(setTripFormValue(name, value));
    },
    [dispatch],
  );

  const setDateRange = (dateRange) => {
    if (!dateRange?.start_date || !dateRange?.end_date) {
      return;
    }

    dispatch(setDateRangeAction(dateRange));
  };

  return { store, setTripValue, setDateRange };
};
