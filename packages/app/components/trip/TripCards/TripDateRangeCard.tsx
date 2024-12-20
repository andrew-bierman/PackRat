import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import useTheme from 'app/hooks/useTheme';
import { TripCardBase } from './TripCardBase';
import { RangePicker } from '@packrat/ui/src/Bento/elements/datepickers';

export interface DateRange {
  start_date: Date | null;
  end_date: Date | null;
}
interface TripDateRangeCardProps {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

export const TripDateRangeCard = ({
  dateRange,
  setDateRange,
}: TripDateRangeCardProps) => {
  const { currentTheme } = useTheme();
  const now = new Date();
  const [selectedDates, setSelectedDates] = useState<Date[]>(() =>
    dateRange?.start_date && dateRange?.end_date
      ? [dateRange.start_date, dateRange.end_date]
      : [],
  );
  const [offsetDate, onOffsetChange] = useState<Date>(now);
  const [open, setOpen] = useState(false);

  const onDatesChange = (dates: Date[]) => {
    const dateRange = dates?.length
      ? {
          start_date: dates[0],
          end_date: dates[1],
        }
      : null;
    setDateRange(dateRange as DateRange);
    setSelectedDates(dates);
  };

  return (
    <RangePicker
      selectedDates={selectedDates}
      onDatesChange={onDatesChange}
      offsetDate={offsetDate}
      onOffsetChange={onOffsetChange}
      open={open}
      setOpen={setOpen}
    />
  );
};
