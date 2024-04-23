import { format } from 'date-fns';

export const formatCreateTripValuesForAPI = (values: any) => {
  return {
    ...values,
    start_date: format(values?.start_date, 'MM/dd/yyyy'),
    end_date: format(values?.end_date, 'MM/dd/yyyy'),
    duration: JSON.stringify(values.duration),
    weather: JSON.stringify(values.weather),
  };
};
