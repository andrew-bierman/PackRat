import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { format } from 'date-fns';
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useTheme from 'app/hooks/useTheme';
import { RStack, RText, Datepickers } from '@packrat/ui';
import { TripCardBase } from './TripCardBase';
const { RangePicker } = Datepickers;

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
    console.log({ dateRange });
    setDateRange(dateRange);
    setSelectedDates(dates);
  };

  return (
    <TripCardBase
      icon={() => (
        <FontAwesome5
          name="calendar"
          size={20}
          color={currentTheme.colors.cardIconColor}
        />
      )}
      title="Trip Date Range"
    >
      <RangePicker
        selectedDates={selectedDates}
        onDatesChange={onDatesChange}
        offsetDate={offsetDate}
        onOffsetChange={onOffsetChange}
        open={open}
        setOpen={setOpen}
      />
    </TripCardBase>
  );
};