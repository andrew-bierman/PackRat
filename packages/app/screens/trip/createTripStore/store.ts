import { type addTrip, type ValidationType } from '@packrat/validations';
import { intervalToDuration, format } from 'date-fns';

type CreateTrip = ValidationType<typeof addTrip>;
export type addTripKey = keyof CreateTrip;

interface CreateTripReducerAction {
  type: 'changeTripFormValue';
  payload: { name: addTripKey; value: any };
}

interface SetDateRangeAction {
  type: 'setDateRange';
  payload: { start_date: Date; end_date: Date };
}

export const setTripFormValue = (
  name: addTripKey,
  value: any,
): CreateTripReducerAction => ({
  type: 'changeTripFormValue',
  payload: { name, value },
});

export const setDateRange = (
  dateRange: {
    start_date: Date;
    end_date: Date;
  } | null,
): SetDateRangeAction => ({
  type: 'setDateRange',
  payload: dateRange || { start_date: new Date(), end_date: new Date() },
});

export const createTripInitialState: Partial<Record<addTripKey, any>> = {
  type: 'trip',
};

export const createTripReducer = (
  state,
  action: SetDateRangeAction | CreateTripReducerAction,
) => {
  if (action.type === 'setDateRange') {
    if (!action.payload) {
      return {
        ...state,
        start_date: undefined,
        end_date: undefined,
        duration: undefined,
      };
    }
    try {
      const { start_date: startDate, end_date: endDate } = action.payload;
      const numberOfNights =
        startDate && endDate
          ? intervalToDuration({
              start: startDate,
              end: endDate,
            }).days
          : '';
      const duration = {
        numberOfNights,
        startDate: format(startDate, 'MM/dd/yyyy'),
        endDate: format(endDate, 'MM/dd/yyyy'),
      };

      return {
        ...state,
        start_date: startDate,
        end_date: endDate,
        duration,
      };
    } catch (e) {
      return state;
    }
  }

  const {
    payload: { name, value },
  } = action;

  return {
    ...state,
    [name]: value,
  };
};
