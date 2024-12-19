import moment from 'moment';

export const formatTripDate = (date: string) => {
  return moment(date, 'MM/DD/YYYY');
};
