import { format } from 'date-fns';
import startCase from 'lodash/startCase';

export const formatCreateTripValuesForAPI = (values: any) => {
  return {
    ...values,
    pack_id: String(values.pack_id),
    start_date: format(values?.start_date, 'MM/dd/yyyy'),
    end_date: format(values?.end_date, 'MM/dd/yyyy'),
    duration: JSON.stringify(values.duration),
    weather: JSON.stringify(values.weather),
  };
};

export const formatTripActivityLabel = (activitySlug: string) => {
  return startCase(activitySlug);
};
