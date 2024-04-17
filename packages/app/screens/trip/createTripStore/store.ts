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

export const setDateRange = ({
  start_date,
  end_date,
}: {
  start_date: Date;
  end_date: Date;
}): SetDateRangeAction => ({
  type: 'setDateRange',
  payload: { start_date, end_date },
});

export const createTripInitialState: Partial<Record<addTripKey, any>> = {};

export const createTripReducer = (
  state,
  action: SetDateRangeAction | CreateTripReducerAction,
) => {
  if (action.type === 'setDateRange') {
    try {
      console.log({ action });
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
      console.log(e);
      return state;
    }
  }

  const {
    payload: { name, value },
  } = action;

  console.log({ name, value });

  return {
    ...state,
    [name]: value,
  };
};
