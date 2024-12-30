import React, { useMemo, useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { extendMoment, DateRange } from 'moment-range';
import moment from 'moment';
import { Button } from 'tamagui';
import { DatePickerInput } from '../Bento/elements/datepickers/common/dateParts';
import RButton from '../RButton';

const extendedMoment = extendMoment(moment as any);
type RangeDate = ReturnType<typeof extendedMoment>;

interface RangePickerProps {
  selectedDates: Date[];
  onDatesChange: (dates: Date[]) => void;
  offsetDate?: Date;
  onOffsetChange?: (date: Date) => void;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const DateRangePicker = ({
  selectedDates,
  onDatesChange,
  open,
  setOpen,
}: RangePickerProps) => {
  const [range, setRange] = useState<[RangeDate?, RangeDate?]>(() => {
    if (!Array.isArray(selectedDates)) {
      return [];
    }

    return selectedDates.map((date) => extendedMoment(date)) as [
      RangeDate,
      RangeDate,
    ];
  });

  const onDayPress = (day) => {
    const selectedDay = extendedMoment(day.dateString, 'YYYY-MM-DD');
    if (range.length < 1 || selectedDay.isSame(range[0], 'day')) {
      return setRange([selectedDay]);
    }
    if (range && range[0] && selectedDay) {
      const newRange = extendedMoment.range(range[0], selectedDay);
      let rangeResult = [
        extendedMoment(newRange.start),
        extendedMoment(newRange.end),
      ];
      if (
        rangeResult[0] &&
        rangeResult[1] &&
        rangeResult[0].isAfter(rangeResult[1])
      ) {
        rangeResult = [rangeResult[1], rangeResult[0]];
      }

      setRange([rangeResult[0], rangeResult[1]]);
      onDatesChange([
        range[0]?.toDate() || new Date(),
        range[1]?.toDate() || new Date(),
      ]);
      setOpen(false);
    }
  };

  const markedDates = useMemo(() => {
    const result = {};
    const period = {
      color: '#000000',
      textColor: '#ffffff',
      startingDay: false,
      endingDay: false,
    };
    const [start, end] = range;

    if (start) {
      const dateString = extendedMoment(start).format('YYYY-MM-DD');
      result[dateString] = { ...period, startingDay: true };
    }

    if (end) {
      const dateString = extendedMoment(end).format('YYYY-MM-DD');
      result[dateString] = {
        ...period,
        endingDay: true,
      };

      // Mark all dates between start and end
      if (start && end) {
        const dates = Array.from(extendedMoment.range(start, end).by('day'));
        dates.forEach((date) => {
          const dateString = date.format('YYYY-MM-DD');
          if (
            dateString !== extendedMoment(start).format('YYYY-MM-DD') &&
            dateString !== extendedMoment(end).format('YYYY-MM-DD')
          ) {
            result[dateString] = period;
          }
        });
      }
    }

    return result;
  }, [range]);

  return (
    <>
      <Modal
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <View>
          <Calendar
            markingType={'period'}
            current={(range?.[0] || extendedMoment()).format('YYYY-MM-DD')}
            markedDates={markedDates}
            onDayPress={onDayPress}
          />
          <RButton
            onPress={() => setOpen(false)}
            style={{ marginHorizontal: 12, marginTop: 12 }}
          >
            Close
          </RButton>
        </View>
      </Modal>
      <DatePickerInput
        value={`${range[0]?.format('YYYY-MM-DD') || ''}${
          range[0] && range[1] ? ' - ' : ''
        }${range[1]?.format('YYYY-MM-DD') || ''}`}
        placeholder="Start date - End date"
        onReset={() => {
          setRange([]);
        }}
        onPressIn={() => setOpen(true)}
        onButtonPress={() => setOpen(true)}
        size="$3"
      />
    </>
  );
};

export default DateRangePicker;
