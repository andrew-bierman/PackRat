import { format, addDays } from 'date-fns';

export const useDate = () => {
  const date = new Date();
  const dateFormatted = format(date, 'MMMM d, yyyy');
  const getNext4Days = (currentDate) => {
    return Array.from({ length: 4 }, (_, i) =>
      format(addDays(currentDate, i + 1), 'EEEE'),
    );
  };
  const day = date.getDay();
  const restOfWeek = getNext4Days(date);

  return { dateFormatted, day, restOfWeek };
};
